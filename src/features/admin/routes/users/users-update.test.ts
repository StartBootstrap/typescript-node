import { FastifyRequest } from 'fastify';

import { mockToUserForResults, mockUpdateUser } from '#mocks/#features/admin/methods/users';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { UpdateUserPayload } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { TestIDParam, TestUpdateUserPayload, TestUser } from '#testing/objects';

import { handler, usersUpdate } from './users-update';

describe('UsersUpdate', () => {
    beforeEach(() => {
        mockUpdateUser.mockReset();
        mockToUserForResults.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: UpdateUserPayload;
            }>
        ).params = new TestIDParam();
        (
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: UpdateUserPayload;
            }>
        ).body = new TestUpdateUserPayload();
    });

    it('should create the usersUpdate route', async () => {
        usersUpdate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should update the user', async () => {
        mockUpdateUser.mockImplementation(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: IDParam;
                Body: UpdateUserPayload;
            }>,
            mockReply as MockFastifyReply<{
                Params: IDParam;
                Body: UpdateUserPayload;
            }>
        );
        expect(mockUpdateUser).toHaveBeenCalled();
        expect(mockToUserForResults).toHaveBeenCalled();
    });
});
