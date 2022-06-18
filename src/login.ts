
export async function attemptLogin(request: ILoginRequest, authDetails: AuthenticationDetails, userType: UserTypes): Promise<IAuthResponse> {
    const cognitoUser = getCognitoUser(request.username, userType);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve({
                    user_type: userType,
                    api_url: userType === UserTypes.ADMIN ? process.env.ADMIN_API_URL! : process.env.CLIENT_API_URL!,
                    token: data.getIdToken().getJwtToken(),
                    refresh_token: data.getRefreshToken().getToken()
                });
            },
            onFailure: (err) => {
                reject(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                if (request.new_password) {
                    delete userAttributes.email_verified;
                    requiredAttributes = userAttributes;
                    cognitoUser.completeNewPasswordChallenge(request.new_password, requiredAttributes, {
                        onSuccess: async (_data) => {
                            resolve(await attemptLogin(request, authDetails, userType));
                        },
                        onFailure: (err) => {
                            reject(err);
                        }
                    });
                } else {
                    response.new_password_required = true;
                    resolve(response);
                }
            }
        });
    });
}
