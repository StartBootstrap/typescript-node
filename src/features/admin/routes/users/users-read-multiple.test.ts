import { FastifyRequest } from 'fastify';

import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { ReadMultipleUsersPayload, RoleName, UserForResults } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { TestUser } from '#testing/objects';

import { handler, usersReadMultiple } from './users-read-multiple';

describe('UsersReadMultiple', () => {
    beforeEach(() => {
        mockGenerateError.mockReset();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Params: IDParam;
        //         Body: ReadMultipleUsersPayload;
        //     }>
        // ).params = new TestOrgIDParam();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Params: IDParam;
        //         Body: ReadMultipleUsersPayload;
        //     }>
        // ).body = new TestReadMultipleUsersPayload();
    });

    // it('should create the usersRead route', async () => {
    //     usersReadMultiple(mockFastifyInstanceParameter, {});
    //     expect(mockRoute).toHaveBeenCalled();
    // });
    // it('should return the users', async () => {
    //     const mockToResultsUser = jest.fn(() => {});
    //     mockFindUsers.mockImplementation(() => [
    //         {
    //             ...new TestUser(),
    //             toResultsUser: mockToResultsUser,
    //         },
    //     ]);
    //     const returnValue = await handler.call(
    //         mockFastifyInstanceParameter,
    //         requestMockWithParams as FastifyRequest<{
    //             Params: OrgIDParam;
    //             Body: ReadMultipleUsersPayload;
    //         }>,
    //         mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: ReadMultipleUsersPayload }>
    //     );
    //     expect(mockFindUsers).toHaveBeenCalled();
    //     expect(mockToResultsUser).toHaveBeenCalled();
    // });
});
