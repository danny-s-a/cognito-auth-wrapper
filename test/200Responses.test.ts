import { Accepted, Created, NoContent, Ok } from '../src/200Responses';
import { StatusCodes } from '../src/statusCodes';
import { getMockEvent } from './testHelpers';

describe('200 Responses', () => {
    it('should return an OK response - no body', () => {
        const mockEvent = getMockEvent();
        const actual = new Ok(mockEvent);

        expect(actual.statusCode).toEqual(StatusCodes.OK);
        expect(actual.body).toBeUndefined();
    });

    it('should return an OK response - with body', () => {
        const mockEvent = getMockEvent();
        const testBody = 'Your request was successful';
        const actual = new Ok(mockEvent, testBody);

        expect(actual.statusCode).toEqual(StatusCodes.OK);
        expect(actual.body).toEqual(JSON.stringify(testBody));
    });

    it('should return an Created response', () => {
        const mockEvent = getMockEvent();
        const testBody = 1;
        const actual = new Created(mockEvent, testBody);

        expect(actual.statusCode).toEqual(StatusCodes.CREATED);
        expect(actual.body).toEqual(JSON.stringify(testBody));
    });

    it('should return an Accepted response', () => {
        const mockEvent = getMockEvent();
        const testBody = 'VM creation initiated';
        const actual = new Accepted(mockEvent, testBody);

        expect(actual.statusCode).toEqual(StatusCodes.ACCEPTED);
        expect(actual.body).toEqual(JSON.stringify(testBody));
    });

    it('should return an NoContent response', () => {
        const mockEvent = getMockEvent();
        const actual = new NoContent(mockEvent);

        expect(actual.statusCode).toEqual(StatusCodes.NO_CONTENT);
        expect(actual.body).toBeUndefined();
    });
});
