import { FastifyPluginAsync } from 'fastify';

import { health } from '#app/plugins';

import { users } from './users';

export const adminRoutes: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.addHook('preHandler', instance.verifyMinRole);

    instance.register(health);
    instance.register(users, { prefix: '/users' });
};
