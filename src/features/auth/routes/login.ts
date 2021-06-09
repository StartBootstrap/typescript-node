import httpCodes from '@inip/http-codes';
import bcrypt from 'bcrypt';
import { FastifyPluginAsync } from 'fastify';

import { RouteAuthConfig } from '#app/models';
import {
    clearInvalidLoginAttempt,
    findUser,
    increaseInvalidLoginAttempt,
} from '#features/admin/methods/users';
import { generateTokenResponse } from '#lib/jwt';
import { RoleName } from '#public-types/admin';
import { LoginErrorCodes, LoginPayload, LoginResponse } from '#public-types/auth';
import { RouteHandlerMethodForConfig } from '#src/augmentations/fastify';

import * as schemas from './_schemas';

export const login: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.route({
        method: 'POST',
        url: '/login',
        schema: schemas.login,
        config: <RouteAuthConfig>{ minRole: RoleName.guest },
        handler,
    });
};

export const handler: RouteHandlerMethodForConfig<{ Body: LoginPayload }> = async function (
    request
): Promise<LoginResponse> {
    const loginPayload: LoginPayload = request.body;

    const foundUser = await findUser(request, {
        where: { email: loginPayload.email.toLowerCase() },
    });

    if (foundUser.accountLocked) {
        throw request.generateError<LoginErrorCodes>(httpCodes.UNAUTHORIZED, 'ACCOUNT_LOCKED');
    }

    if (!foundUser.auth.authLocal) {
        throw request.generateError<LoginErrorCodes>(httpCodes.UNAUTHORIZED, 'NO_LOCAL_ACCOUNT');
    }

    if (foundUser.auth.authLocal.passwordChangeRequired === true) {
        throw request.generateError<LoginErrorCodes>(
            httpCodes.UNAUTHORIZED,
            'PASSWORD_CHANGE_REQUIRED'
        );
    }

    const validPassword = await bcrypt.compare(
        loginPayload.password,
        foundUser.auth.authLocal.passwordHash
    );

    if (!validPassword) {
        await increaseInvalidLoginAttempt(request, foundUser);
        throw request.generateError<LoginErrorCodes>(httpCodes.UNAUTHORIZED, 'INVALID_PASSWORD');
    }

    // Password is valid, so let's reset any invalid password attempts if there are any
    if (foundUser.invalidLoginAttempts) {
        await clearInvalidLoginAttempt(request, foundUser);
    }

    return generateTokenResponse(foundUser);
};
