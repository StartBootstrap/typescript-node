import { mockFastifyInstance, mockRegister } from '#mocks/fastify';

import { adminRoutes } from './index';

describe('Admin Routes', () => {
    it('should register routes on instance', () => {
        adminRoutes(mockFastifyInstance, {});
        expect(mockRegister).toHaveBeenCalledTimes(2);
    });
});
