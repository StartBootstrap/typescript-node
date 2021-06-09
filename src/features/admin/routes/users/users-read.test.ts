import { FastifyRequest } from 'fastify';

import { mockFindUser, mockToUserForResults } from '#mocks/#features/admin/methods/users';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { IDParam } from '#public-types/global';
import { TestIDParam, TestUser } from '#testing/objects';

import { handler, usersRead } from './users-read';

describe('UsersRead', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockToUserForResults.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
            }>
        ).params = new TestIDParam();
    });

    it('should create the usersRead route', async () => {
        usersRead(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the user', async () => {
        mockFindUser.mockImplementation(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
            }>,
            mockReply as MockFastifyReply<{ Params: IDParam }>
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(mockToUserForResults).toHaveBeenCalled();
    });
});
