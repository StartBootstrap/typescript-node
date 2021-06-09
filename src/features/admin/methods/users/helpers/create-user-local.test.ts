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
import { RoleName } from '#public-types/admin';
import { TestAllRoles, TestMembership, TestRegisterPayload, TestUser } from '#testing/objects';

import { createUserLocal } from './create-user-local';

describe('Helpers: Create User Local', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockCode.mockReset();
    });

    it('should create a user', async () => {
        const testError = new Error('USER_NOT_FOUND');
        const roleFindManyMock = prismaMock.role.findMany.mockResolvedValueOnce(TestAllRoles);
        const userCreateMock = prismaMock.user.create.mockResolvedValueOnce(new TestUser());
        const membershipCreateMock = prismaMock.membership.create.mockResolvedValueOnce(
            new TestMembership()
        );
        const userUpdateMock = prismaMock.user.update.mockResolvedValueOnce(new TestUser());
        mockFindUser.mockImplementationOnce(() => {
            throw testError;
        });

        await createUserLocal.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            new TestRegisterPayload(),
            RoleName.editor,
            true
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(roleFindManyMock).toHaveBeenCalled();
        expect(userCreateMock).toHaveBeenCalled();
        expect(membershipCreateMock).toHaveBeenCalled();
        expect(userUpdateMock).toHaveBeenCalled();
    });
    it('should catch errors when trying to find user', async () => {
        const testError = new Error('SOME_OTHER_ERROR');
        mockFindUser.mockImplementationOnce(() => {
            throw testError;
        });
        try {
            await createUserLocal.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                new TestRegisterPayload(),
                RoleName.editor
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
    it('should error if the email is already in use', async () => {
        mockFindUser.mockImplementationOnce(() => new TestUser());
        try {
            await createUserLocal.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                new TestRegisterPayload(),
                RoleName.editor
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.CONFLICT, 'EMAIL_IN_USE');
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if role is not found', async () => {
        const testError = new Error('USER_NOT_FOUND');
        const roleFindManyMock = prismaMock.role.findMany.mockResolvedValueOnce([]);
        mockFindUser.mockImplementationOnce(() => {
            throw testError;
        });

        try {
            await createUserLocal.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest,
                new TestRegisterPayload()
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_CREATING_USER',
                new Error(`ROLE_NOT_FOUND: registered`)
            );
            expect(roleFindManyMock).toHaveBeenCalled();
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
