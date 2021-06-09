/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyRequest } from 'fastify';

import { mockDeleteAuths, mockDeleteAuthsLocals } from '#mocks/#features/admin/methods/auth';
import { mockDeleteUsers, mockFindUser } from '#mocks/#features/admin/methods/users';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { IDParam } from '#public-types/global';
import { TestIDParam, TestUser } from '#testing/objects';

import { handler, usersDelete } from './users-delete';

describe('UsersDelete', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockDeleteUsers.mockReset();
        (requestMockWithParams as FastifyRequest<{ Params: IDParam }>).params = new TestIDParam();
    });

    it('should create the usersDelete route', async () => {
        usersDelete(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should delete the user', async () => {
        mockFindUser.mockImplementation(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{ Params: IDParam }>,
            mockReply as MockFastifyReply<{ Params: IDParam }>
        );
        expect(mockFindUser).toHaveBeenCalled();
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
        mockFindUser.mockImplementation(() => testUser);
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{ Params: IDParam }>,
            mockReply as MockFastifyReply<{ Params: IDParam }>
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(mockDeleteUsers).toHaveBeenCalled();
        expect(mockDeleteAuths).toHaveBeenCalled();
        expect(mockDeleteAuthsLocals).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
});
