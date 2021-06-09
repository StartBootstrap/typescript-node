import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import { mockCreateUserLocal, mockToUserForResults } from '#mocks/#features/admin/lib/users';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { CreateUserPayload } from '#public-types/admin';
import { TestCreateUserPayload, TestUser } from '#testing/objects';

import { handler, usersCreate } from './users-create';

describe('UsersCreate', () => {
    beforeEach(() => {
        mockCreateUserLocal.mockReset();
        mockToUserForResults.mockReset();
        mockCode.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: CreateUserPayload;
            }>
        ).body = new TestCreateUserPayload();
    });

    it('should create the usersCreate route', async () => {
        usersCreate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should call createUserLocal', async () => {
        mockCreateUserLocal.mockImplementation(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: CreateUserPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: CreateUserPayload }>
        );
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(mockCreateUserLocal).toHaveBeenCalled();
        expect(mockToUserForResults).toHaveBeenCalled();
    });
    // it('should catch errors when trying to create user', async () => {
    //     mockFindUsersFilter.mockImplementation(() => []);
    //     const thrownError = new Error('TEST_ERROR');
    //     mockEMSave.mockImplementation(() => {
    //         throw thrownError;
    //     });
    //     try {
    //         const returnValue = await handler.call(
    //             mockFastifyInstanceParameter,
    //             requestMockWithParams as FastifyRequest<{
    //                 Params: OrgIDParam;
    //                 Body: CreateUserPayload;
    //             }>,
    //             mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
    //         );
    //     } catch (error) {
    //         expect(mockGenerateError).toHaveBeenLastCalledWith(
    //             httpCodes.INTERNAL_SERVER_ERROR,
    //             'ERROR_CREATING_USER',
    //             thrownError
    //         );
    //     }
    // });
    // it('should error if the email is already in use', async () => {
    //     mockFindUsersFilter.mockImplementation(() => [{}]);
    //     try {
    //         const returnValue = await handler.call(
    //             mockFastifyInstanceParameter,
    //             requestMockWithParams as FastifyRequest<{
    //                 Params: OrgIDParam;
    //                 Body: CreateUserPayload;
    //             }>,
    //             mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
    //         );
    //     } catch (error) {
    //         expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.CONFLICT, 'EMAIL_IN_USE');
    //     }
    // });
});
