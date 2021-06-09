import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { UserForAuthentication } from '#features/admin/models';
import { prismaMock } from '#mocks/#lib/prisma';
import {
    mockFastifyInstanceParameter,
    mockGenerateError,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { saveUser } from './save-user';

describe('Helpers: Save User', () => {
    it('should save user', async () => {
        const testUser = new TestUser();
        const userUpdateMock = prismaMock.user.update.mockResolvedValueOnce(testUser);

        await saveUser.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            {} as UserForAuthentication
        );
        expect(userUpdateMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to save user', async () => {
        const testError = new Error('TEST_ERROR');
        prismaMock.user.update.mockRejectedValueOnce(testError);
        try {
            await saveUser.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                {} as UserForAuthentication
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_SAVING_USER',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
