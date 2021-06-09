/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { mockClearInvalidLoginAttempt, mockFindUser } from '#mocks/#features/admin/methods/users';
import { mockGenerateTokenResponse } from '#mocks/#lib/jwt';
import { mockCompare } from '#mocks/bcrypt';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { LoginPayload } from '#public-types/auth';
import { TestLoginPayload, TestUser } from '#testing/objects';

import { handler, login } from './login';

describe('Login', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockCompare.mockClear();
        mockGenerateError.mockReset();
        mockClearInvalidLoginAttempt.mockReset();
        mockGenerateTokenResponse.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: LoginPayload;
            }>
        ).body = new TestLoginPayload();
    });

    it('should create the usersFind route', async () => {
        login(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should log the user in', async () => {
        mockFindUser.mockImplementationOnce(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: LoginPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: LoginPayload }>
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(mockGenerateTokenResponse).toHaveBeenCalled();
    });
    it('should error if the account is locked', async () => {
        const testUser = new TestUser();
        testUser.accountLocked = true;
        mockFindUser.mockImplementationOnce(() => testUser);
        try {
            await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Body: LoginPayload;
                }>,
                mockReply as MockFastifyReply<{ Body: LoginPayload }>
            );
            expect(mockGenerateTokenResponse).not.toHaveBeenCalled();
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'ACCOUNT_LOCKED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if no local account', async () => {
        const testUser = new TestUser();
        // @ts-ignore
        delete testUser.auth.authLocal;
        mockFindUser.mockImplementationOnce(() => testUser);
        try {
            await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Body: LoginPayload;
                }>,
                mockReply as MockFastifyReply<{ Body: LoginPayload }>
            );
            expect(mockGenerateTokenResponse).not.toHaveBeenCalled();
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NO_LOCAL_ACCOUNT'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if the password requires changing', async () => {
        const testUser = new TestUser();
        testUser.auth.authLocal.passwordChangeRequired = true;
        mockFindUser.mockImplementationOnce(() => testUser);
        try {
            await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Body: LoginPayload;
                }>,
                mockReply as MockFastifyReply<{ Body: LoginPayload }>
            );
            expect(mockGenerateTokenResponse).not.toHaveBeenCalled();
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'PASSWORD_CHANGE_REQUIRED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error for invalid password', async () => {
        const testUser = new TestUser();
        mockCompare.mockReturnValueOnce(false);
        mockFindUser.mockImplementationOnce(() => testUser);
        try {
            await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Body: LoginPayload;
                }>,
                mockReply as MockFastifyReply<{ Body: LoginPayload }>
            );
            expect(mockGenerateTokenResponse).not.toHaveBeenCalled();
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'INVALID_PASSWORD'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should should clear invalidLoginAttempts after successful login', async () => {
        const testUser = new TestUser();
        testUser.invalidLoginAttempts = 3;
        mockFindUser.mockImplementationOnce(() => testUser);
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: LoginPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: LoginPayload }>
        );
        expect(mockGenerateTokenResponse).toHaveBeenCalled();
        expect(mockClearInvalidLoginAttempt).toHaveBeenCalled();
    });
});
