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

import { handler, usersDelete } from './users-delete';

describe('UsersDelete', () => {
    beforeEach(() => {
        // mockGenerateError.mockReset();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Body: DeleteMultipleUsersPayload;
        //     }>
        // ).params = new TestIDAndOrgIDParams();
    });

    it('should create the usersDelete route', async () => {
        usersDelete(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    // it('should delete the user', async () => {
    //     mockFindUser.mockImplementation(() => new TestUser());
    //     const returnValue = await handler.call(
    //         mockFastifyInstanceParameter,
    //         requestMockWithParams as FastifyRequest<{ Params: IDAndOrgIDParams }>,
    //         mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams }>
    //     );
    //     expect(mockFindUser).toHaveBeenCalled();
    //     expect(mockCode).toHaveBeenCalledWith(204);
    // });
    // it('should catch errors when trying to remove user', async () => {
    //     const thrownError = new Error('TEST_ERROR');
    //     mockFindUser.mockImplementation(() => new TestUser());
    //     mockEMRemove.mockImplementation(() => {
    //         throw thrownError;
    //     });
    //     try {
    //         const returnValue = await handler.call(
    //             mockFastifyInstanceParameter,
    //             requestMockWithParams as FastifyRequest<{ Params: IDAndOrgIDParams }>,
    //             mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams }>
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
