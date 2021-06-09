import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { mockFindUser } from '#mocks/#features/admin/methods/users';
import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockCode,
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';

import { deleteAuthLocals, deleteAuths } from './delete-auth';

describe('Helpers: Delete Auth', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockCode.mockReset();
    });

    it('should deleteAuths', async () => {
        const authDeleteManyMock = prismaMock.auth.deleteMany;

        await deleteAuths.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            {}
        );
        expect(authDeleteManyMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to deleteAuths', async () => {
        const testError = new Error('TEST_ERROR');
        const authDeleteManyMock = prismaMock.auth.deleteMany.mockRejectedValueOnce(testError);

        try {
            await deleteAuths.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {}
            );
        } catch (error) {
            expect(authDeleteManyMock).toHaveBeenCalled();
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_DELETING_AUTH',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should deleteAuthLocals', async () => {
        const authDeleteManyMock = prismaMock.authLocal.deleteMany;

        await deleteAuthLocals.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            {}
        );
        expect(authDeleteManyMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to deleteAuthLocals', async () => {
        const testError = new Error('TEST_ERROR');
        const authDeleteManyMock = prismaMock.authLocal.deleteMany.mockRejectedValueOnce(testError);

        try {
            await deleteAuthLocals.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {}
            );
        } catch (error) {
            expect(authDeleteManyMock).toHaveBeenCalled();
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_DELETING_LOCAL_AUTH',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
