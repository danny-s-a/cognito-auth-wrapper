import * as jwt from 'jsonwebtoken';
import { getUser } from '../src/index';

describe('Utils', () => {
    const testUsername = 'test@test.com';
    const getTestToken = (key: string = 'email') => jwt.sign({ [key]: testUsername }, 'secret');

    it('should retrieve user', () => {
        const token = getTestToken();

        const actual = getUser(token);

        expect(actual).toEqual(testUsername);
    });

    it('should retrieve user - different key for username', () => {
        const usernameKey = 'username';
        const token = getTestToken(usernameKey);

        const actual = getUser(token, usernameKey);

        expect(actual).toEqual(testUsername);
    });

    it('should throw error - username not found', () => {
        const badUsernameKey = 'aDifferentKey';
        const token = getTestToken();

        expect(() => getUser(token, badUsernameKey))
            .toThrow(
                new Error(`Key "${badUsernameKey}" for username does not exist on token`)
            );
    });
});
