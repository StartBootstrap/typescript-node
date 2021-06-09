import { FastifyRequest } from 'fastify';

import { mockCreateUserLocal } from '#mocks/#features/admin/methods/users';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '#mocks/fastify';
import { RegisterPayload } from '#public-types/auth';
import { TestRegisterPayload } from '#testing/objects';

import { handler, register } from './register';

describe('UsersFind', () => {
    beforeEach(() => {
        mockCreateUserLocal.mockReset();
        mockCode.mockReset();
        (
            requestMockWithParams as FastifyRequest<{
                Body: RegisterPayload;
            }>
        ).body = new TestRegisterPayload();
    });

    it('should create the usersFind route', async () => {
        register(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should register a new user', async () => {
        await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Body: RegisterPayload;
            }>,
            mockReply as MockFastifyReply<{ Body: RegisterPayload }>
        );
        expect(mockCreateUserLocal).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
});
