import { mockFindUsersFilter } from '@mocks/@app/routes/_shared';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '@mocks/fastify';
import { OrgIDParam, TestOrgIDParam } from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersAll } from './users-all';

describe('UsersAll', () => {
    beforeEach(() => {
        mockFindUsersFilter.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
        }>).params = new TestOrgIDParam();
    });

    it('should create the usersAll route', async () => {
        usersAll(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });

    it('should get all users', async () => {
        mockFindUsersFilter.mockImplementationOnce(() => [
            new TestUser(),
            new TestUser(),
            new TestUser(),
        ]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{ Params: OrgIDParam }>,
            mockReply as MockFastifyReply<{ Params: OrgIDParam }>
        );
        expect(mockFindUsersFilter).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(3);
    });
});
