import httpCodes from '@inip/http-codes';

import { mockFastifyInstance, mockGenerateError, requestMock } from '#mocks/fastify';
import { TestUser } from '#testing/objects';

import { isRegistered } from './is-registered';

describe('Decorator isRegistered', () => {
    it('should error if user is not found on request object', async () => {
        try {
            await isRegistered.call(mockFastifyInstance, requestMock);
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
            await isRegistered.call(mockFastifyInstance, {
                ...requestMock,
                user: <TestUser>{
                    ...new TestUser(),
                    email: 'root@root',
                },
            });
        } catch (error) {
            expect('ERROR SHOULD __NOT__ HAVE BEEN THROWN').toBe(1);
        }
    });
});
