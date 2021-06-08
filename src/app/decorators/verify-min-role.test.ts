// import httpCodes from '@inip/http-codes';
// import { mockConfig } from '@mocks/@lib/config';
// import { mockIsSameID } from '@mocks/@lib/util';
// import { mockFastifyInstance, mockGenerateError, mockReply, requestMock } from '@mocks/fastify';
// import { RoleName } from '@start-bootstrap/website-shared-types';
// import { TestUser } from '@testing/objects';
// import set from 'lodash/set';

// import { verifyMinRole } from './verify-min-role';

// const adminUser = new TestUser();
// adminUser.memberships[0].role.name = RoleName.admin;
// const editorUser = new TestUser();
// editorUser.memberships[0].role.name = RoleName.editor;
// const guestUser = new TestUser();
// guestUser.memberships[0].role.name = RoleName.guest;
// const noRoleUser = new TestUser();
// delete noRoleUser.memberships[0].role;

// describe('Decorator verifyMinRole', () => {
//     beforeEach(() => {
//         mockGenerateError.mockReset();
//         mockConfig.mockClear();
//         mockIsSameID.mockClear();
//         mockConfig.mockImplementation(() => ({
//             featureToggles: {
//                 multiTenant: false,
//             },
//         }));
//     });
//     it('should error if userRole is not found on request object', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 requestMock,
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.UNAUTHORIZED, 'NO_USER');
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should allow request to pass if minRole is guest', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.guest)
//             );
//         } catch (error) {
//             expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
//         }
//     });
//     it('should _setCurrentRole even if minRole is guest', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.guest)
//             );
//         } catch (error) {
//             expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
//         }
//     });
//     it('should error if minRole is not set on the route context', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', undefined)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(
//                 httpCodes.UNAUTHORIZED,
//                 'ROUTE_NOT_CONFIGURED_FOR_AUTHORIZATION'
//             );
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should throw UNAUTHORIZED if the user does not have enough priveledge', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: editorUser,
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(
//                 httpCodes.UNAUTHORIZED,
//                 'NOT_AUTHORIZED'
//             );
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should allow the request to continute', async () => {
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
//         }
//     });
//     it('should fail if multi-tanant but no orgID on request.params', async () => {
//         mockConfig.mockImplementation(() => ({
//             featureToggles: {
//                 multiTenant: true,
//             },
//         }));
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                     params: {},
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.UNAUTHORIZED, 'NO_ORG_ID');
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should verify the org if multi-tanant', async () => {
//         mockConfig.mockImplementation(() => ({
//             featureToggles: {
//                 multiTenant: true,
//             },
//         }));
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                     params: {
//                         orgID: '00000000-0000-0000-0000-00000testorg',
//                     },
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
//         }
//     });
//     it('should error if no membership found', async () => {
//         mockIsSameID.mockReturnValueOnce(false);
//         mockConfig.mockImplementation(() => ({
//             featureToggles: {
//                 multiTenant: true,
//             },
//         }));
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: adminUser,
//                     params: {
//                         orgID: '00000000-0000-0000-0000-0000000noorg',
//                     },
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(
//                 httpCodes.UNAUTHORIZED,
//                 'NO_MEMBERSHIP'
//             );
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should error if no role is found', async () => {
//         mockConfig.mockImplementation(() => ({
//             featureToggles: {
//                 multiTenant: true,
//             },
//         }));
//         try {
//             const returnValue = await verifyMinRole.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: noRoleUser,
//                     params: {
//                         orgID: '00000000-0000-0000-0000-00000testorg',
//                     },
//                 },
//                 set({ ...mockReply }, 'context.config.minRole', RoleName.admin)
//             );
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(httpCodes.UNAUTHORIZED, 'NO_ROLE');
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
// });
