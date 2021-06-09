import { mockFastifyInstance, mockRegister } from '#mocks/fastify';

import { users } from './index';

describe('Features Admin Routes Users', () => {
    it('should register user routes', () => {
        users(mockFastifyInstance, {});
        expect(mockRegister).toHaveBeenCalledTimes(9);
    });
});
