export function getCognitoUser(username: string, clientId: string, poolId: string) {
    const userPool = new CognitoUserPool({
        UserPoolId: poolId,
        ClientId: clientId
    });

    const userDetails = {
        Username: username,
        Pool: userPool
    };

    return new CognitoUser(userDetails);
}
