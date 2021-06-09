import { mockFastifyInstance, mockRegister } from '#mocks/fastify';

import { authRoutes } from './index';

describe('Auth Routes', () => {
    it('should register routes on instance', () => {
        authRoutes(mockFastifyInstance, {});
        expect(mockRegister).toHaveBeenCalledTimes(3);
    });
});
