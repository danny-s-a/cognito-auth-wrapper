import { InternalServerError, NotImplemented } from '../src/500Responses';
import { StatusCodes } from '../src/statusCodes';

describe('500 Responses', () => {
    it('should return an InternalServerError exception', () => {
        const actual = new InternalServerError();

        expect(actual.statusCode).toEqual(StatusCodes.INTERNAL_ERROR);
        expect(actual.message).toEqual('Internal Server Error');
    });

    it('should return an NotImplemented exception - no message', () => {
        const actual = new NotImplemented();

        expect(actual.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
        expect(actual.message).toBeUndefined();
    });

    it('should return an NotImplemented exception - with message', () => {
        const actual = new NotImplemented('The method called has not been implemented');

        expect(actual.statusCode).toEqual(StatusCodes.NOT_IMPLEMENTED);
        expect(actual.message).toEqual('The method called has not been implemented');
    });
});
