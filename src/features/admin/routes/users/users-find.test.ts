import { mockFindUsersFilter } from '@mocks/@app/routes/_shared';
import {
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMock,
    requestMockWithParams,
} from '@mocks/fastify';
import {
    FindUsersPayload,
    OrgIDParam,
    TestFindUsersPayload,
    TestOrgIDParam,
} from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersFind } from './users-find';

describe('UsersFind', () => {
    beforeEach(() => {
        mockFindUsersFilter.mockReset();
        mockGenerateError.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: FindUsersPayload;
        }>).params = new TestOrgIDParam();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: FindUsersPayload;
        }>).body = new TestFindUsersPayload();
    });

    it('should create the usersFind route', async () => {
        usersFind(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should return the user', async () => {
        mockFindUsersFilter.mockImplementationOnce(() => [
            new TestUser(),
            new TestUser(),
            new TestUser(),
        ]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: OrgIDParam;
                Body: FindUsersPayload;
            }>,
            mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: FindUsersPayload }>
        );
        expect(mockFindUsersFilter).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(3);
    });
    it('should add organizationId to any where queries', async () => {
        mockFindUsersFilter.mockImplementationOnce(() => [new TestUser()]);
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            {
                ...(requestMockWithParams as FastifyRequest<{
                    Params: OrgIDParam;
                    Body: FindUsersPayload;
                }>),
                body: {
                    where: [{ a: 1 }],
                },
            },
            mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: FindUsersPayload }>
        );
        expect(mockFindUsersFilter).toHaveBeenCalled();
        expect((returnValue as []).length).toEqual(1);
    });
});
