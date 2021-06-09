import { FastifyRequest } from 'fastify';

import { mockCreateUserLocal, mockToUserForResults } from '#mocks/#features/admin/methods/users';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { CreateUserPayload } from '#public-types/admin';
import { TestCreateUserPayload, TestUser } from '#testing/objects';

import { handler, usersCreate } from './users-create';

describe('UsersCreate', () => {
    beforeEach(() => {
        mockCreateUserLocal.mockReset();
        mockToUserForResults.mockReset();
        mockCode.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: CreateUserPayload;
            }>
        ).body = new TestCreateUserPayload();
    });

    it('should create the usersCreate route', async () => {
        usersCreate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should call createUserLocal', async () => {
        mockCreateUserLocal.mockImplementation(() => new TestUser());
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: CreateUserPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: CreateUserPayload }>
        );
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(mockCreateUserLocal).toHaveBeenCalled();
        expect(mockToUserForResults).toHaveBeenCalled();
    });
});
