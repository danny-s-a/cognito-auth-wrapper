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
            newPasswordRequired: () => {
                if (loginRequest.new_password) {
                    cognitoUser.completeNewPasswordChallenge(loginRequest.new_password, undefined, {
                        onSuccess: async () => {
                            resolve(
                                await attemptLogin(
                                    {
                                        username: loginRequest.username,
                                        password: loginRequest.new_password!
                                    },
                                    clientId,
                                    poolId
                                )
                            );
                        },
                        onFailure: (err) => {
                            console.log('Error setting new pwd');
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
