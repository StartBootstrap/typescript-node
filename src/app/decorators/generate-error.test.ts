import { requestMock } from '#mocks/fastify';

import { generateError } from './generate-error';

describe('Decorator generateError', () => {
    it('should generate a FastifyError and return it', async () => {
        const generatedError = generateError.call(requestMock, 500, 'TEST_ERROR');
        expect(generatedError.message).toEqual('TEST_ERROR');
    });
    it('should log the thrownError if provided', async () => {
        const generatedError = generateError.call(
            requestMock,
            500,
            'TEST_THROWN_ERROR',
            new Error('THROWN_ERROR')
        );
        expect(generatedError.message).toEqual('TEST_THROWN_ERROR');
        expect(requestMock.log.error).toHaveBeenCalled();
    });
    it('should append detail message to error message if provided', async () => {
        const generatedError = generateError.call(
            requestMock,
            500,
            'TEST_ERROR',
            undefined,
            'DETAIL_MESSAGE'
        );
        expect(generatedError.message).toEqual('TEST_ERROR : DETAIL_MESSAGE');
    });
});
