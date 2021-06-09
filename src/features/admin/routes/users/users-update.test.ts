import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { UpdateUserPayload } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { TestUser } from '#testing/objects';

import { handler, usersUpdate } from './users-update';

describe('UsersUpdate', () => {
    beforeEach(() => {
        mockGenerateError.mockReset();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Params: IDParam;
        //         Body: UpdateUserPayload;
        //     }>
        // ).params = new TestIDAndOrgIDParams();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Params: IDParam;
        //         Body: UpdateUserPayload;
        //     }>
        // ).body = new TestUpdateUserPayload();
    });

    it('should create the usersUpdate route', async () => {
        usersUpdate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    // it('should update the user', async () => {
    //     const mockToResultsUser = jest.fn(() => {});
    //     mockFindUser.mockImplementation(() => ({
    //         ...new TestUser(),
    //         toResultsUser: mockToResultsUser,
    //     }));
    //     const returnValue = await handler.call(
    //         mockFastifyInstanceParameter,
    //         requestMockWithParams as FastifyRequest<{
    //             Params: IDAndOrgIDParams;
    //             Body: UpdateUserPayload;
    //         }>,
    //         mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams; Body: UpdateUserPayload }>
    //     );
    //     expect(mockFindUser).toHaveBeenCalled();
    //     expect(mockSaveUser).toHaveBeenCalled();
    //     expect(mockToResultsUser).toHaveBeenCalled();
    // });
});
