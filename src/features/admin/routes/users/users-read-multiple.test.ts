import { mockFindUsers } from '@mocks/@app/routes/_shared';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '@mocks/fastify';
import {
    OrgIDParam,
    ReadMultipleUsersPayload,
    TestOrgIDParam,
    TestReadMultipleUsersPayload,
} from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersReadMultiple } from './users-read-multiple';

describe('UsersReadMultiple', () => {
    beforeEach(() => {
        mockFindUsers.mockReset();
        mockGenerateError.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: ReadMultipleUsersPayload;
        }>).params = new TestOrgIDParam();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: ReadMultipleUsersPayload;
        }>).body = new TestReadMultipleUsersPayload();
    });

    it('should create the usersRead route', async () => {
        usersReadMultiple(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the users', async () => {
        const mockToResultsUser = jest.fn(() => {});
        mockFindUsers.mockImplementation(() => [
            {
                ...new TestUser(),
                toResultsUser: mockToResultsUser,
            },
        ]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: OrgIDParam;
                Body: ReadMultipleUsersPayload;
            }>,
            mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: ReadMultipleUsersPayload }>
        );
        expect(mockFindUsers).toHaveBeenCalled();
        expect(mockToResultsUser).toHaveBeenCalled();
    });
});
