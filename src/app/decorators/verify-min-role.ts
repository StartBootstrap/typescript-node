import httpCodes from '@inip/http-codes';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import { roleNameValues } from '#features/admin/models';
import { AuthErrorCodes } from '#features/auth/models';
import { RoleName } from '#public-types/admin';

declare module 'fastify' {
    interface FastifyInstance {
        verifyMinRole(request: FastifyRequest, reply: FastifyReply): void;
    }
    interface FastifyRequest {
        currentRole: RoleName;
    }
}

export async function verifyMinRole(
    this: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const minRole: RoleName = (reply.context.config as RouteAuthConfig).minRole;

    if (!minRole) {
        throw request.generateError<AuthErrorCodes>(
            httpCodes.UNAUTHORIZED,
            'ROUTE_NOT_CONFIGURED_FOR_AUTHORIZATION'
        );
    }

    if (minRole === 'guest') {
        if (request.user) {
            _setCurrentRole();
        }
        return;
    }

    if (!request.user) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NO_USER');
    }

    const currentRole = _setCurrentRole();

    if (roleNameValues[minRole] < roleNameValues[currentRole]) {
        throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NOT_AUTHORIZED');
    }

    function _setCurrentRole() {
        const currentMembership = request.user.memberships[0];

        const userRole: RoleName = currentMembership.role?.name as RoleName;

        if (!userRole) {
            throw request.generateError<AuthErrorCodes>(httpCodes.UNAUTHORIZED, 'NO_ROLE');
        }

        request.currentRole = userRole;
        return userRole;
    }
}
