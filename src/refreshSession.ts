import { CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { IAuthResponse } from './models';
import { getCognitoUser } from './internal';

export async function refreshSession(
    username: string,
    refreshToken: string,
    clientId: string,
    poolId: string): Promise<IAuthResponse> {
    return new Promise((resolve, reject) => {
        const RefreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });
        const cognitoUser = getCognitoUser(username, clientId, poolId);

        cognitoUser.refreshSession(RefreshToken, (err, session) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    idToken: session.idToken.jwtToken,
                    refreshToken: session.refreshToken.token
                });
            }
        });
    });
}
