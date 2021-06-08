import httpCodes from '@inip/http-codes';
import { mockFindUsersFilter } from '@mocks/@app/routes/_shared';
import {
    mockCode,
    mockFastifyInstanceParameter,
    MockFastifyReply,
    mockGenerateError,
    mockReply,
    mockRoute,
    requestMockWithParams,
} from '@mocks/fastify';
import { mockEMSave } from '@mocks/typeorm';
import {
    CreateUserPayload,
    OrgIDParam,
    TestCreateUserPayload,
    TestOrgIDParam,
} from '@start-bootstrap/website-shared-types';
import { TestUser } from '@testing/objects';
import { FastifyRequest } from 'fastify';

import { handler, usersCreate } from './users-create';

describe('UsersCreate', () => {
    beforeEach(() => {
        mockFindUsersFilter.mockReset();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: CreateUserPayload;
        }>).params = new TestOrgIDParam();
        (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: CreateUserPayload;
        }>).body = new TestCreateUserPayload();
    });

    it('should create the usersCreate route', async () => {
        usersCreate(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should create a user', async () => {
        mockFindUsersFilter.mockImplementation(() => []);
        const mockToResultsUser = jest.fn(() => {});
        mockEMSave.mockImplementation(() => ({
            ...new TestUser(),
            toResultsUser: mockToResultsUser,
        }));
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: OrgIDParam;
                Body: CreateUserPayload;
            }>,
            mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
        );
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(mockToResultsUser).toHaveBeenCalled();
    });
    it('should create a user with no groups', async () => {
        mockFindUsersFilter.mockImplementation(() => []);
        const mockToResultsUser = jest.fn(() => {});
        mockEMSave.mockImplementation(() => ({
            ...new TestUser(),
            toResultsUser: mockToResultsUser,
        }));
        delete (requestMockWithParams as FastifyRequest<{
            Params: OrgIDParam;
            Body: CreateUserPayload;
        }>).body.groups;
        const returnValue = await handler.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest<{
                Params: OrgIDParam;
                Body: CreateUserPayload;
            }>,
            mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
        );
        expect(mockCode).toHaveBeenCalledWith(201);
        expect(mockToResultsUser).toHaveBeenCalled();
    });
    it('should catch errors when trying to create user', async () => {
        mockFindUsersFilter.mockImplementation(() => []);
        const thrownError = new Error('TEST_ERROR');
        mockEMSave.mockImplementation(() => {
            throw thrownError;
        });
        try {
            const returnValue = await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Params: OrgIDParam;
                    Body: CreateUserPayload;
                }>,
                mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.INTERNAL_SERVER_ERROR,
                'ERROR_CREATING_USER',
                thrownError
            );
        }
    });
    it('should error if the email is already in use', async () => {
        mockFindUsersFilter.mockImplementation(() => [{}]);
        try {
            const returnValue = await handler.call(
                mockFastifyInstanceParameter,
                requestMockWithParams as FastifyRequest<{
                    Params: OrgIDParam;
                    Body: CreateUserPayload;
                }>,
                mockReply as MockFastifyReply<{ Params: OrgIDParam; Body: CreateUserPayload }>
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.CONFLICT, 'EMAIL_IN_USE');
        }
    });
});
