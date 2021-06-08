import { FastifyPluginAsync } from 'fastify';

import { health } from '#app/plugins';

import { login } from './login';
import { register } from './register';

export const authRoutes: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.register(health);
    instance.register(login);
    instance.register(register);
};
