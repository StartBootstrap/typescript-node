import httpCodes from '@inip/http-codes';
import { Prisma, User } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { updateUser } from './update-user';

describe('Helpers: Update User', () => {
    it('should update user', async () => {
        const testUser = new TestUser();
        const userUpdateMock = prismaMock.user.update.mockResolvedValueOnce(testUser);

        await updateUser.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            {} as Prisma.UserUpdateArgs
        );
        expect(userUpdateMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to update user', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.update.mockRejectedValueOnce(testError);
        try {
            await updateUser.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {} as Prisma.UserUpdateArgs
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_UPDATING_USER',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if unable to find user', async () => {
        prismaMock.user.update.mockResolvedValueOnce(null as unknown as User);
        try {
            await updateUser.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {} as Prisma.UserUpdateArgs
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
