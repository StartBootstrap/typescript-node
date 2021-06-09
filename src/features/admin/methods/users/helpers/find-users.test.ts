import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { findUsers } from './find-users';

describe('Helpers: Find Users', () => {
    it('should find user', async () => {
        const testUser = new TestUser();
        const userfindManyMock = prismaMock.user.findMany.mockResolvedValueOnce([testUser]);

        await findUsers.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            { include: {} } as Prisma.UserFindUniqueArgs
        );
        expect(userfindManyMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to find user', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.findMany.mockRejectedValueOnce(testError);
        try {
            await findUsers.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                { include: {} } as Prisma.UserFindUniqueArgs
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
    it('should error if unable to find user', async () => {
        prismaMock.user.findMany.mockResolvedValueOnce([]);
        try {
            await findUsers.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                { include: {} } as Prisma.UserFindUniqueArgs
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.NOT_FOUND,
                'NO_USERS_FOUND'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
