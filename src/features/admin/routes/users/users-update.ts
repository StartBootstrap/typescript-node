import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { toUserForResults, updateUser } from '#features/admin/methods/users';
import { RoleName, UpdateUserPayload, UserForResults } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersUpdate: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'PUT',
        url: '/:id',
        schema: schemas.usersUpdate,
        handler: handler as RouteHandlerMethodForConfig,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Params: IDParam;
    Body: UpdateUserPayload;
}> = async function (request): Promise<UserForResults> {
    const updateUserParams: IDParam = request.params;
    const updateUserPayload: UpdateUserPayload = request.body;

    const updatedUser = await updateUser(request, {
        where: { id: updateUserParams.id },
        data: updateUserPayload,
    });

    return toUserForResults(updatedUser);
};
