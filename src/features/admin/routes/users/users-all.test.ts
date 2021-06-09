import { FastifyRequest } from 'fastify';

import { mockAllUsers, mockToUserForResults } from '#mocks/#features/admin/methods/users';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#testing/objects';

import { handler, usersAll } from './users-all';

describe('UsersAll', () => {
    beforeEach(() => {
        mockAllUsers.mockReset();
        mockToUserForResults.mockReset();
    });

    it('should create the usersAll route', async () => {
        usersAll(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });

    it('should get all users', async () => {
        mockAllUsers.mockImplementationOnce(() => [new TestUser(), new TestUser(), new TestUser()]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            mockReply as MockFastifyReply
        );
        expect(mockAllUsers).toHaveBeenCalled();
        expect(mockToUserForResults).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(3);
    });
});
