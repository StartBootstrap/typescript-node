import httpCodes from '@inip/http-codes';
import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { createUserLocal } from '#features/admin/methods/users';
import { RoleName } from '#public-types/admin';
import { RegisterPayload } from '#public-types/auth';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const register: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/register',
        schema: schemas.register,
        config: <RouteAuthConfig>{ minRole: RoleName.guest },
        handler: handler,
    });
};

export const handler: RouteHandlerMethodForConfig<{
    Body: RegisterPayload;
}> = async function (request, reply): Promise<void> {
    const registerPayload: RegisterPayload = request.body;

    await createUserLocal(request, registerPayload);

    reply.code(httpCodes.NO_CONTENT);
};
