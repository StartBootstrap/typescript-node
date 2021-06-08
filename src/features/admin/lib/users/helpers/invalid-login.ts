import { FastifyRequest } from 'fastify';

import { UserForAuthentication } from '#features/admin/models';
import config from '#lib/config';

import { saveUser } from './save-user';

export const increaseInvalidLoginAttempt = async function (
    request: FastifyRequest,
    user: UserForAuthentication
): Promise<UserForAuthentication> {
    if (user.invalidLoginAttempts !== null) {
        user.invalidLoginAttempts++;
        if (user.invalidLoginAttempts >= config().auth.maxLoginAttempts) {
            user.accountLocked = true;
        }
        return await saveUser(request, user);
    }
    user.invalidLoginAttempts = 1;
    return await saveUser(request, user);
};

export const clearInvalidLoginAttempt = async function (
    request: FastifyRequest,
    user: UserForAuthentication
): Promise<UserForAuthentication> {
    user.invalidLoginAttempts = null;
    return await saveUser(request, user);
};
