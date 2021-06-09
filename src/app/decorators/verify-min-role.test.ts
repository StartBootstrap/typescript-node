/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpCodes from '@inip/http-codes';
import set from 'lodash/set';

import { mockConfig } from '#mocks/#lib/config';
import { mockIsSameID } from '#mocks/#lib/util';
import { mockFastifyInstance, mockGenerateError, mockReply, requestMock } from '#mocks/fastify';
import { RoleName } from '#public-types/admin';
import { TestUser } from '#testing/objects';

import { verifyMinRole } from './verify-min-role';

const adminUser = new TestUser();
adminUser.memberships[0].role.name = RoleName.admin;
const editorUser = new TestUser();
editorUser.memberships[0].role.name = RoleName.editor;
const guestUser = new TestUser();
guestUser.memberships[0].role.name = RoleName.guest;
const noRoleUser = new TestUser();
// @ts-ignore
delete noRoleUser.memberships[0].role;

describe('Decorator verifyMinRole', () => {
    beforeEach(() => {
        mockGenerateError.mockReset();
        mockConfig.mockClear();
        mockIsSameID.mockClear();
    });
    it('should error if userRole is not found on request object', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                requestMock,
                set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.UNAUTHORIZED, 'NO_USER');
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should allow request to pass if minRole is guest', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                },
                set({ ...mockReply }, 'context.config.minRole', RoleName.guest)
            );
        } catch (error) {
            expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
        }
    });
    it('should _setCurrentRole even if minRole is guest', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                    user: adminUser,
                },
                set({ ...mockReply }, 'context.config.minRole', RoleName.guest)
            );
        } catch (error) {
            expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
        }
    });
    it('should error if minRole is not set on the route context', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                    user: adminUser,
                },
                set({ ...mockReply }, 'context.config.minRole', undefined)
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'ROUTE_NOT_CONFIGURED_FOR_AUTHORIZATION'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should throw UNAUTHORIZED if the user does not have enough priveledge', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                    user: editorUser,
                },
                set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NOT_AUTHORIZED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should allow the request to continute', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                    user: adminUser,
                },
                set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
            );
        } catch (error) {
            expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
        }
    });
    it('should error if no role is found', async () => {
        try {
            await verifyMinRole.call(
                mockFastifyInstance,
                {
                    ...requestMock,
                    user: noRoleUser,
                    params: {
                        orgID: '00000000-0000-0000-0000-00000testorg',
                    },
                },
                set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.UNAUTHORIZED, 'NO_ROLE');
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
});
