/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyRequest } from 'fastify';

import { mockDeleteAuths, mockDeleteAuthsLocals } from '#mocks/#features/admin/methods/auth';
import { mockDeleteUsers, mockFindUsers } from '#mocks/#features/admin/methods/users';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { DeleteMultipleUsersPayload } from '#public-types/admin';
import { TestDeleteMultipleUsersPayload, TestUser } from '#testing/objects';

import { handler, usersDeleteMultiple } from './users-delete-multiple';

describe('UsersDeleteMultiple', () => {
    beforeEach(() => {
        mockFindUsers.mockReset();
        mockDeleteUsers.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: DeleteMultipleUsersPayload;
            }>
        ).body = new TestDeleteMultipleUsersPayload();
    });

    it('should create the usersDelete route', async () => {
        usersDeleteMultiple(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should delete multiple users', async () => {
        mockFindUsers.mockImplementation(() => [new TestUser()]);
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: DeleteMultipleUsersPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: DeleteMultipleUsersPayload }>
        );
        expect(mockFindUsers).toHaveBeenCalled();
        expect(mockDeleteUsers).toHaveBeenCalled();
        expect(mockDeleteAuths).toHaveBeenCalled();
        expect(mockDeleteAuthsLocals).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
    it('should not deleteAuths if they do not exist', async () => {
        const testUser = new TestUser();
        // @ts-ignore
        delete testUser.authId;
        // @ts-ignore
        delete testUser.auth.localId;
        mockFindUsers.mockImplementation(() => [testUser]);
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: DeleteMultipleUsersPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: DeleteMultipleUsersPayload }>
        );
        expect(mockFindUsers).toHaveBeenCalled();
        expect(mockDeleteUsers).toHaveBeenCalled();
        expect(mockDeleteAuths).toHaveBeenCalled();
        expect(mockDeleteAuthsLocals).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
});
