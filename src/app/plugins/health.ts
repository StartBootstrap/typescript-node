import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { RoleName } from '#public-types/admin';

// import { RouteAuthConfig } from '#lib/orm/models';

export const health: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/health',
        handler,
        config: <RouteAuthConfig>{ minRole: RoleName.guest },
    });
};

export const handler: RouteHandlerMethod = async function (request, reply): Promise<void> {
    reply.send('alive');
};
