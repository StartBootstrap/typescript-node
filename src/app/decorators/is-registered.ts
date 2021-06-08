import httpCodes from '@inip/http-codes';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { UserForAuthentication } from '#features/admin/models';
import { AuthErrorCodes } from '#features/auth/models';

declare module 'fastify' {
    interface FastifyInstance {
        isRegistered(request: FastifyRequest, reply: FastifyReply): void;
    }
}

export async function isRegistered(this: FastifyInstance, request: FastifyRequest): Promise<void> {
    const user: UserForAuthentication = request?.user;

    if (!user) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NOT_AUTHORIZED');
    }
}
