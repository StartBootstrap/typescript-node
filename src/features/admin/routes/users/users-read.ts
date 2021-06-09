import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { findUser, toUserForResults } from '#features/admin/methods/users';
import { RoleName, UserForResults } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersRead: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/:id',
        schema: schemas.usersRead,
        handler: handler,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Params: IDParam;
}> = async function (request): Promise<UserForResults> {
    const readUserParams: IDParam = request.params;
    const foundUser = await findUser(request, {
        where: { id: readUserParams.id },
    });

    return toUserForResults(foundUser);
};
