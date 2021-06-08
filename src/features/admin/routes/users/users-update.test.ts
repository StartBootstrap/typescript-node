import httpCodes from '@inip/http-codes';
import { mockFindUser, mockSaveUser } from '@mocks/@app/routes/_shared';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockSave } from '@mocks/typeorm';
import {
    IDAndOrgIDParams,
    TestIDAndOrgIDParams,
    TestUpdateUserPayload,
    UpdateUserPayload,
} from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersUpdate } from './users-update';

describe('UsersUpdate', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockSaveUser.mockReset();
        mockGenerateError.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: IDAndOrgIDParams;
            Body: UpdateUserPayload;
        }>).params = new TestIDAndOrgIDParams();
        (requestMockWithParams as FastifyRequest<{
            Params: IDAndOrgIDParams;
            Body: UpdateUserPayload;
        }>).body = new TestUpdateUserPayload();
    });

    it('should create the usersUpdate route', async () => {
        usersUpdate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should update the user', async () => {
        const mockToResultsUser = jest.fn(() => {});
        mockFindUser.mockImplementation(() => ({
            ...new TestUser(),
            toResultsUser: mockToResultsUser,
        }));
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: IDAndOrgIDParams;
                Body: UpdateUserPayload;
            }>,
            mockReply as MockFastifyReply<{ Params: IDAndOrgIDParams; Body: UpdateUserPayload }>
        );
        expect(mockFindUser).toHaveBeenCalled();
        expect(mockSaveUser).toHaveBeenCalled();
        expect(mockToResultsUser).toHaveBeenCalled();
    });
});
