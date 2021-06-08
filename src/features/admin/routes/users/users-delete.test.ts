import httpCodes from '@inip/http-codes';
import { mockFindUser } from '@mocks/@app/routes/_shared';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockEMRemove } from '@mocks/typeorm';
import { IDAndOrgIDParams, TestIDAndOrgIDParams } from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersDelete } from './users-delete';

describe('UsersDelete', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockGenerateError.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: IDAndOrgIDParams;
        }>).params = new TestIDAndOrgIDParams();
    });

    it('should create the usersDelete route', async () => {
        usersDelete(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should delete the user', async () => {
        mockFindUser.mockImplementation(() => new TestUser());
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{ Params: IDAndOrgIDParams }>,
            mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams }>
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(mockCode).toHaveBeenCalledWith(204);
    });
    it('should catch errors when trying to remove user', async () => {
        const thrownError = new Error('TEST_ERROR');
        mockFindUser.mockImplementation(() => new TestUser());
        mockEMRemove.mockImplementation(() => {
            throw thrownError;
        });
        try {
            const returnValue = await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{ Params: IDAndOrgIDParams }>,
                mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams }>
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_DELETING_USER',
                thrownError
            );
        }
    });
});
