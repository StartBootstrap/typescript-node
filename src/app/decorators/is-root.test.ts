// import httpCodes from '@inip/http-codes';
// import { mockFastifyInstance, mockGenerateError, mockReply, requestMock } from '@mocks/fastify';
// import { TestUser } from '@testing/objects';

// import { isRoot } from './is-root';

// describe('Decorator isRoot', () => {
//     it('should error if user is not found on request object', async () => {
//         try {
//             const returnValue = await isRoot.call(mockFastifyInstance, requestMock, mockReply);
//         } catch (error) {
//             expect(mockGenerateError).toHaveBeenLastCalledWith(
//                 httpCodes.UNAUTHORIZED,
//                 'NOT_AUTHORIZED'
//             );
//             return;
//         }
//         expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
//     });
//     it('should error if the user email is not root@root', async () => {
//         try {
//             const returnValue = await isRoot.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: new TestUser(),
//                 },
//                 mockReply
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
//             const returnValue = await isRoot.call(
//                 mockFastifyInstance,
//                 {
//                     ...requestMock,
//                     user: <TestUser>{
//                         ...new TestUser(),
//                         email: 'root@root',
//                     },
//                 },
//                 mockReply
//             );
//         } catch (error) {
//             expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
//         }
//     });
// });
