import httpCodes from '@inip/http-codes';
import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { deleteAuthLocals, deleteAuths } from '#features/admin/methods/auth';
import { deleteUsers, findUser } from '#features/admin/methods/users';
import { RoleName } from '#public-types/admin';
import { IDParam } from '#public-types/global';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersDelete: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'DELETE',
        url: '/:id',
        schema: schemas.usersDelete,
        handler: handler as RouteHandlerMethodForConfig,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Params: IDParam;
}> = async function (request, reply): Promise<undefined> {
    const deleteUserParams: IDParam = request.params;

    const foundUser = await findUser(request, {
        where: { id: deleteUserParams.id },
    });

    await deleteUsers(request, { where: { id: deleteUserParams.id } });
    await deleteAuths(request, { where: { id: foundUser.authId } });

    if (foundUser.auth.localId) {
        await deleteAuthLocals(request, { where: { id: foundUser.auth.localId } });
    }

    reply.code(httpCodes.NO_CONTENT);
    return;
};
