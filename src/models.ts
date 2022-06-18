export interface ILoginRequest {
    username: string;
    password: string;
    new_password?: string;
}

export interface IAuthResponse {
    idToken: string;
    refreshToken: string
}
