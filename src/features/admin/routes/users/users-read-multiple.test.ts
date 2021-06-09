import { FastifyRequest } from 'fastify';

import { mockFindUsers } from '#mocks/#features/admin/methods/users';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { ReadMultipleUsersPayload } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { TestIDParam, TestReadMultipleUsersPayload, TestUser } from '#testing/objects';

import { handler, usersReadMultiple } from './users-read-multiple';

describe('UsersReadMultiple', () => {
    beforeEach(() => {
        mockFindUsers.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: ReadMultipleUsersPayload;
            }>
        ).params = new TestIDParam();
        (
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: ReadMultipleUsersPayload;
            }>
        ).body = new TestReadMultipleUsersPayload();
    });

    it('should create the usersRead route', async () => {
        usersReadMultiple(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the users', async () => {
        mockFindUsers.mockImplementationOnce(() => [
            new TestUser(),
            new TestUser(),
            new TestUser(),
        ]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: ReadMultipleUsersPayload;
            }>,
            mockReply as MockFastifyReply<{
                Params: IDParam;
                Body: ReadMultipleUsersPayload;
            }>
        );
        expect(mockFindUsers).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(3);
    });
});
