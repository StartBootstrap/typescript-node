import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import { mockFindUsers } from '#mocks/#features/admin/methods/users';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { TestUser } from '#testing/objects';

import { handler, usersFind } from './users-find';

describe('UsersFind', () => {
    beforeEach(() => {
        mockFindUsers.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: Prisma.UserFindManyArgs;
            }>
        ).body = {};
    });

    it('should create the usersFind route', async () => {
        usersFind(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the user', async () => {
        mockFindUsers.mockImplementationOnce(() => [
            new TestUser(),
            new TestUser(),
            new TestUser(),
        ]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: Prisma.UserFindManyArgs;
            }>,
            mockReply as MockFastifyReply<{ Body: Prisma.UserFindManyArgs }>
        );
        expect(mockFindUsers).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(3);
    });
});
