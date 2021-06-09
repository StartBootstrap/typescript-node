import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { allUsers, toUserForResults } from '#features/admin/methods/users';
import { RoleName, UserForResults } from '#public-types/admin';

import * as schemas from './_schemas';

export const usersAll: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/',
        schema: schemas.usersAll,
        handler,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethod = async function (request): Promise<UserForResults[]> {
    const users = await allUsers(request);
    return users.map(user => toUserForResults(user));
};
