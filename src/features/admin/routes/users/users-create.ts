import httpCodes from '@inip/http-codes';
import { FastifyPluginAsync } from 'fastify';

// import { Auth, AuthLocal, Group, Membership, User } from '#lib/orm/entity';
import { RouteAuthConfig } from '#app/models';
import { createUserLocal, toUserForResults } from '#features/admin/methods/users';
import { CreateUserPayload, RoleName, UserForResults } from '#public-types/admin';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const usersCreate: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/',
        schema: schemas.usersCreate,
        handler,
        config: <RouteAuthConfig>{ minRole: RoleName.admin },
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Body: CreateUserPayload;
}> = async function (request, reply): Promise<UserForResults> {
    const createUserPayload: CreateUserPayload = request.body;

    const { roleName, ...registerPayload } = createUserPayload;
    const createdUser = await createUserLocal(request, registerPayload, roleName, true);

    reply.code(httpCodes.CREATED);
    return toUserForResults(createdUser);
};
