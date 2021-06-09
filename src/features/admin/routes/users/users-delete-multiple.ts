import httpCodes from '@inip/http-codes';
import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { deleteAuthLocals, deleteAuths } from '#features/admin/methods/auth';
import { deleteUsers, findUsers } from '#features/admin/methods/users';
import { DeleteMultipleUsersPayload, RoleName } from '#public-types/admin';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersDeleteMultiple: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/delete-multiple',
        schema: schemas.usersDeleteMultiple,
        handler: handler as RouteHandlerMethodForConfig,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Body: DeleteMultipleUsersPayload;
}> = async function (request, reply): Promise<undefined> {
    const deleteMultipleUserPayload: DeleteMultipleUsersPayload = request.body;

    const foundUsers = await findUsers(request, {
        where: { id: { in: deleteMultipleUserPayload.userIDs } },
    });

    await deleteUsers(request, { where: { id: { in: deleteMultipleUserPayload.userIDs } } });

    const authIDs: UUID[] = [];
    const authLocalIDs: UUID[] = [];

    foundUsers.forEach(user => {
        authIDs.push(user.authId);
        if (user.auth.localId) {
            authLocalIDs.push(user.auth.localId);
        }
    });

    await deleteAuths(request, { where: { id: { in: authIDs } } });

    if (authLocalIDs.length > 0) {
        await deleteAuthLocals(request, { where: { id: { in: authLocalIDs } } });
    }

    reply.code(httpCodes.NO_CONTENT);
    return;
};
