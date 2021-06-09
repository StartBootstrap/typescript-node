import { mockFastifyInstance, mockRegister } from '#mocks/fastify';

import { featuresRoutes } from './index';

describe('Features Index', () => {
    it('should register routes on instance', () => {
        featuresRoutes(mockFastifyInstance, {});
        expect(mockRegister).toHaveBeenCalledTimes(3);
    });
});
