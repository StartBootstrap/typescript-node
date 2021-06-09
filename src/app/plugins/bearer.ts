import httpCodes from '@inip/http-codes';
import { FastifyPluginAsync, preHandlerHookHandler } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { findUser } from '#features/admin/methods/users';
import { UserForAuthentication } from '#features/admin/models';
import { AuthErrorCodes } from '#features/auth/models';
import { validateToken } from '#lib/jwt';
import { DecodedToken } from '#public-types/auth';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserForAuthentication;
    }
}

export const bearerPlugin: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.decorate('user', null);
    instance.addHook('preHandler', bearerHook);
};

export const bearerHook: preHandlerHookHandler = async function (request): Promise<void> {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return;
    }
    const [scheme, token] = authHeader.split(/\s+/);

    if (scheme.toLowerCase() !== 'bearer') {
        throw request.generateError<AuthErrorCodes>(
            httpCodes.BAD_REQUEST,
            'BEARER_SCHEMA_REQUIRED'
        );
    }
    let decodedToken: DecodedToken;

    try {
        decodedToken = validateToken(token);
    } catch (error) {
        throw request.generateError<AuthErrorCodes>(
            httpCodes.UNAUTHORIZED,
            'NOT_AUTHORIZED',
            error
        );
    }

    let user: UserForAuthentication;

    try {
        user = await findUser(request, {
            where: { id: decodedToken.id },
        });
    } catch (error) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NO_USER', error);
    }

    request.user = user;
};

export const bearer = fastifyPlugin(bearerPlugin);
