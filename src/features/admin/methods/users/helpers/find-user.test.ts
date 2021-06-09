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

import { findUser } from './find-user';

describe('Helpers: Find User', () => {
    it('should find user', async () => {
        const testUser = new TestUser();
        const userfindUniqueMock = prismaMock.user.findUnique.mockResolvedValueOnce(testUser);

        await findUser.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            { include: {} } as Prisma.UserFindUniqueArgs
        );
        expect(userfindUniqueMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to find user', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.findUnique.mockRejectedValueOnce(testError);
        try {
            await findUser.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                { include: {} } as Prisma.UserFindUniqueArgs
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_FINDING_USER',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if unable to find user', async () => {
        prismaMock.user.findUnique.mockResolvedValueOnce(null);
        try {
            await findUser.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                { include: {} } as Prisma.UserFindUniqueArgs
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.NOT_FOUND,
                'USER_NOT_FOUND'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
