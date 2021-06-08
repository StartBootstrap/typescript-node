import httpCodes from '@inip/http-codes';
import { FastifyInstance, FastifyRequest } from 'fastify';
import get from 'lodash/get';

import { UserForAuthentication } from '#features/admin/models';
import { AuthErrorCodes } from '#features/auth/models';

declare module 'fastify' {
    interface FastifyInstance {
        isRoot(request: FastifyRequest, reply: FastifyReply): void;
    }
}

export async function isRoot(this: FastifyInstance, request: FastifyRequest): Promise<void> {
    const user: UserForAuthentication = get(request, 'user');

    if (!user) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NO_USER');
    }

    if (user.email !== 'root@root') {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NOT_AUTHORIZED');
    }
}
