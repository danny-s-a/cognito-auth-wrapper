import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export function getCognitoUser(username: string, clientId: string, poolId: string): CognitoUser {
    const userPool = new CognitoUserPool({
        UserPoolId: poolId,
        ClientId: clientId
    });

    return new CognitoUser({
        Username: username,
        Pool: userPool
    });
}
