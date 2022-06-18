# Simple Cognito Auth

## Overview
Simple wrapper around the [amazon-cognito-identity-js](https://www.npmjs.com/package/amazon-cognito-identity-js) to save the duplication of code when creating new NodeJS-based services that handle user authentication

<br> 

## Example

### Login
```javascript
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Ok, errorHandler, BadRequest } from 'aws-lambda-response-helper';
import { attemptLogin, ILoginRequest } from 'simple-cognito-auth';

export const loginHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        if (!event.body) {
            throw new BadRequest('Body not provided');
        }

        const loginRequest: ILoginRequest = JSON.parse(event.body);
        const authResponse = await attemptLogin(
            loginRequest,
            '<your cognito client ID>',
            '<your cognito pool ID>'
        );

        return new Ok(event, authResponse);
    } catch (err) {
        return errorHandler(err, event);
    }
};
```

### Refresh Session
```javascript
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Ok, errorHandler, BadRequest } from 'aws-lambda-response-helper';
import { refreshSession, getUser } from './index';

export const refreshSessionHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        if (!event.queryStringParameters || !event.queryStringParameters.refresh_token) {
            throw new BadRequest('Refresh token not provided, must provide query param "refresh_token"');
        }

        const authResponse = await refreshSession(
            getUser(event.headers.Authorization!),
            event.queryStringParameters.refresh_token,
            '<your cognito client ID>',
            '<your cognito pool ID>'
        );

        return new Ok(event, authResponse);
    } catch (err) {
        return errorHandler(err, event);
    }
};
```

<br>

## Contributing
Contributions welcome! 
Please follow steps below

1. Checkout a new branch from main
2. Document changes in the CHANGELOG.md under a new version number (guide in the changelog)
3. Up the version in package.json
4. Submit a PR
