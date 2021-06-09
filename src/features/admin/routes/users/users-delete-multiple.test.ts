import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { DeleteMultipleUsersPayload } from '#public-types/admin';
import { TestUser } from '#testing/objects';

import { handler, usersDeleteMultiple } from './users-delete-multiple';

describe('UsersDeleteMultiple', () => {
    beforeEach(() => {
        mockGenerateError.mockReset();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Body: DeleteMultipleUsersPayload;
        //     }>
        // ).body = new TestDeleteMultipleUsersPayload();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Body: DeleteMultipleUsersPayload;
        //     }>
        // ).params = new TestOrgIDParam();
    });

    it('should create the usersDelete route', async () => {
        usersDeleteMultiple(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    // it('should delete multiple users', async () => {
    //     mockFindUsers.mockImplementation(() => [new TestUser()]);
    //     const returnValue = await handler.call(
    //         mockFastifyInstanceParameter,
    //         requestMockWithParams as FastifyRequest<{
    //             Params: OrgIDParam;
    //             Body: DeleteMultipleUsersPayload;
    //         }>,
    //         mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: DeleteMultipleUsersPayload }>
    //     );
    //     expect(mockFindUsers).toHaveBeenCalled();
    //     expect(mockCode).toHaveBeenCalledWith(204);
    // });
    // it('should catch errors when trying to remove users', async () => {
    //     const thrownError = new Error('TEST_ERROR');
    //     mockFindUsers.mockImplementation(() => [new TestUser()]);
    //     mockEMRemove.mockImplementation(() => {
    //         throw thrownError;
    //     });
    //     try {
    //         const returnValue = await handler.call(
    //             mockFastifyInstanceParameter,
    //             requestMockWithParams as FastifyRequest<{
    //                 Params: OrgIDParam;
    //                 Body: DeleteMultipleUsersPayload;
    //             }>,
    //             mockReply as MockFastifyReply<{
    //                 Params: OrgIDParam;
    //                 Body: DeleteMultipleUsersPayload;
    //             }>
    //         );
    //     } catch (error) {
    //         expect(mockGenerateError).toHaveBeenLastCalledWith(
    //             httpCodes.INTERNAL_SERVER_ERROR,
    //             'ERROR_DELETING_USER',
    //             thrownError
    //         );
    //     }
    // });
});
