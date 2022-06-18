import { BadRequest } from '../src/400Responses';
import { InternalServerError } from '../src/500Responses';
import { errorHandler, ErrorResponse } from '../src/errorHandler';
import { getMockEvent } from './testHelpers';

describe('Error Handler', () => {
    const mockEvent = getMockEvent();

    it('should return an ErrorResponse using an InternalServerError', () => {
        const testError = new Error('I\'m an unknown error!');
        const expected = new ErrorResponse(
            new InternalServerError(),
            mockEvent
        );

        const actual = errorHandler(testError, mockEvent);

        expect(actual).toEqual(expected);
    });

    it('should return ErrorResponse using the CustomException provided', () => {
        const testError = new BadRequest('Clien did a bad thing');
        const expected = new ErrorResponse(
            testError,
            mockEvent
        );

        const actual = errorHandler(testError, mockEvent);

        expect(actual).toEqual(expected);
    });
});
