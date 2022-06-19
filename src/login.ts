import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Unauthorised } from 'aws-lambda-response-helper';
import { IAuthResponse, ILoginRequest } from './models';
import { getCognitoUser } from './internal';

export async function attemptLogin(
    loginRequest: ILoginRequest,
    clientId: string,
    poolId: string): Promise<IAuthResponse> {
    const authDetails = new AuthenticationDetails({
        Username: loginRequest.username,
        Password: loginRequest.password
    });
    const cognitoUser = getCognitoUser(loginRequest.username, clientId, poolId);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve({
                    idToken: data.getIdToken().getJwtToken(),
                    refreshToken: data.getRefreshToken().getToken()
                });
            },
            onFailure: (err) => {
                if (err.code && (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException')) {
                    reject(new Unauthorised('Incorrect username or password'));
                } else {
                    reject(err);
                }
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                if (loginRequest.new_password) {
                    delete userAttributes.email_verified;
                    requiredAttributes = userAttributes;

                    cognitoUser.completeNewPasswordChallenge(loginRequest.new_password, requiredAttributes, {
                        onSuccess: async (_data) => {
                            resolve(await attemptLogin(loginRequest, clientId, poolId));
                        },
                        onFailure: (err) => {
                            reject(err);
                        }
                    });
                } else {
                    reject(new Unauthorised('New password required'));
                }
            }
        });
    });
}
