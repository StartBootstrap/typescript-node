import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { findUsers, toUserForResults } from '#features/admin/methods/users';
import { ReadMultipleUsersPayload, RoleName, UserForResults } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersReadMultiple: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/read-multiple',
        schema: schemas.usersReadMultiple,
        handler: handler as RouteHandlerMethodForConfig,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Params: IDParam;
    Body: ReadMultipleUsersPayload;
}> = async function (request): Promise<UserForResults[]> {
    const readMultipleUsersPayload: ReadMultipleUsersPayload = request.body;
    const foundUsers = await findUsers(request, {
        where: { id: { in: readMultipleUsersPayload.userIDs } },
    });

    return foundUsers.map(user => toUserForResults(user));
};
