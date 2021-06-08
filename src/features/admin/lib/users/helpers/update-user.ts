import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import {
    UpdateUserErrorCodes,
    UserForAuthentication,
    userForAuthenticationInclude,
} from '#features/admin/models';
import prisma from '#lib/prisma';

export const updateUser = async function (
    request: FastifyRequest,
    selectSubset: Prisma.UserUpdateArgs
): Promise<UserForAuthentication> {
    let foundUser: UserForAuthentication | null;

    try {
        foundUser = await prisma().user.update({
            ...selectSubset,
            include: {
                ...selectSubset.include,
                ...userForAuthenticationInclude,
            },
        });
    } catch (error) {
        throw request.generateError<UpdateUserErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_UPDATING_USER',
            error
        );
    }

    if (!foundUser) {
        throw request.generateError<UpdateUserErrorCodes>(httpCodes.NOT_FOUND, 'USER_NOT_FOUND');
    }

    return foundUser as UserForAuthentication;
};
