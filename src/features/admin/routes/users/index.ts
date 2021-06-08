import { FastifyPluginAsync } from 'fastify';

import { health } from '#app/plugins';

import { usersAll } from './users-all';
import { usersCreate } from './users-create';
import { usersDelete } from './users-delete';
import { usersDeleteMultiple } from './users-delete-multiple';
import { usersFind } from './users-find';
import { usersRead } from './users-read';
import { usersReadMultiple } from './users-read-multiple';
import { usersUpdate } from './users-update';

export const users: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.register(health);
    instance.register(usersAll);
    instance.register(usersCreate);
    instance.register(usersRead);
    instance.register(usersReadMultiple);
    instance.register(usersUpdate);
    instance.register(usersDelete);
    instance.register(usersDeleteMultiple);
    instance.register(usersFind);
};
