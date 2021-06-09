import { RouteAuthConfig } from '#app/models';
import { mockFastifyInstance } from '#mocks/fastify';
import { RouteOptionsForConfig } from '#src/augmentations/fastify';

import { filterPublicRoutes, publicRoutes } from './public-routes';

describe('Public Routes test', () => {
    it('should process onRoute hook calls', () => {
        filterPublicRoutes.call(mockFastifyInstance, {
            url: '/api/latest/internal/test',
        } as RouteOptionsForConfig<RouteAuthConfig>);

        filterPublicRoutes.call(mockFastifyInstance, {
            method: 'GET',
            url: '/api/latest/org/test',
            preHandler: [() => {}],
            handler: () => {},
            config: {} as RouteAuthConfig,
        } as RouteOptionsForConfig<RouteAuthConfig>);

        filterPublicRoutes.call(mockFastifyInstance, {
            method: 'GET',
            url: '/api/latest/org/test',
            preHandler: () => {},
            handler: () => {},
            config: { minRole: 'guest' },
        } as RouteOptionsForConfig<RouteAuthConfig>);

        filterPublicRoutes.call(mockFastifyInstance, {
            method: 'GET',
            url: '/api/latest/org/test',
            handler: () => {},
        } as RouteOptionsForConfig<RouteAuthConfig>);

        expect(publicRoutes().length).toEqual(3);
    });
});
