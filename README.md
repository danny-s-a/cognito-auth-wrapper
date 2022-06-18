# AWS Lambda Response Helper

## Overview
Simple response library for use with AWS Lambda.
Contains a collection of inbuilt response classes and an abstract Response base class that can be used to extend the library to suit implementers needs.
Only param required by a Response object is the `event`, during instantiation the Response class uses this to log out information about the request for auditing purposes.

<br> 

## Example

```javascript
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Ok, BadRequest, errorHandler } from 'aws-lambda-response-helper';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        if (!event.body) {
            throw new BadRequest('Body not provided');
        }

        // Do some stuff with the body

        return Ok(event);
    } catch (err) {
        return errorHandler(event, err);
    }
}
```

<br>

## Contributing
Contributions welcome! 
Please follow steps below

1. Checkout a new branch from main
2. Document changes in the CHANGELOG.md under a new version number (guide in the changelog)
3. Up the version in package.json
4. Submit a PR
