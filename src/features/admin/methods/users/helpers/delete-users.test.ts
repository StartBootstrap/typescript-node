import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';

import { deleteUsers } from './delete-users';

describe('Helpers: Delete Users', () => {
    it('should delete users', async () => {
        const userDeleteManyMock = prismaMock.user.deleteMany;

        await deleteUsers.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            {}
        );
        expect(userDeleteManyMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to delete users', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.deleteMany.mockRejectedValueOnce(testError);
        try {
            await deleteUsers.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_DELETING_USER',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
