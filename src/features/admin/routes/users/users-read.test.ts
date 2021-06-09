import { FastifyRequest } from 'fastify';

import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { IDParam } from '#public-types/global';
import { TestUser } from '#testing/objects';

import { handler, usersRead } from './users-read';

describe('UsersRead', () => {
    beforeEach(() => {
        // mockFindUser.mockReset();
        // mockGenerateError.mockReset();
        // (
        //     requestMockWithParams as FastifyRequest<{
        //         Params: IDParam;
        //     }>
        // ).params = new TestIDAndOrgIDParams();
    });

    it('should create the usersRead route', async () => {
        usersRead(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    // it('should return the user', async () => {
    //     const mockToResultsUser = jest.fn(() => {});
    //     mockFindUser.mockImplementation(() => ({
    //         ...new TestUser(),
    //         toResultsUser: mockToResultsUser,
    //     }));
    //     const returnValue = await handler.call(
    //         mockFastifyInstanceParameter,
    //         requestMockWithParams as FastifyRequest<{ Params: IDAndOrgIDParams }>,
    //         mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams }>
    //     );
    //     expect(mockFindUser).toHaveBeenCalled();
    //     expect(mockToResultsUser).toHaveBeenCalled();
    // });
});
