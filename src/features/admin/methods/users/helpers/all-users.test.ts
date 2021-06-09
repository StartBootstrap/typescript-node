import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { allUsers } from './all-users';

describe('Helpers: All Users', () => {
    it('should find user', async () => {
        const testUser = new TestUser();
        const userfindManyMock = prismaMock.user.findMany.mockResolvedValueOnce([testUser]);

        await allUsers.call(mockFastifyInstanceParameter, requestMockWithParams as FastifyRequest);
        expect(userfindManyMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to find users', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.findMany.mockRejectedValueOnce(testError);
        try {
            await allUsers.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_FINDING_USERS',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if unable to find users', async () => {
        prismaMock.user.findMany.mockResolvedValueOnce([]);
        try {
            await allUsers.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.NOT_FOUND,
                'USERS_NOT_FOUND'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
