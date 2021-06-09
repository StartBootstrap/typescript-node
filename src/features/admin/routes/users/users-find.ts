import { Prisma } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { findUsers, toUserForResults } from '#features/admin/methods/users';
import { RoleName, UserForResults } from '#public-types/admin';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersFind: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/find',
        schema: schemas.usersFind,
        handler: handler as RouteHandlerMethodForConfig,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Body: Prisma.UserFindManyArgs;
}> = async function (request): Promise<UserForResults[]> {
    const readUserPayload: Prisma.UserFindManyArgs = request.body;

    const foundUsers = await findUsers(request, readUserPayload);

    return foundUsers.map(user => toUserForResults(user));
};
