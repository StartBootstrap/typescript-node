import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import {
    FindUserErrorCodes,
    UserForAuthentication,
    userForAuthenticationInclude,
} from '#features/admin/models';
import prisma from '#lib/prisma';

export const findUser = async function (
    request: FastifyRequest,
    selectSubset: Prisma.UserFindUniqueArgs
): Promise<UserForAuthentication> {
    let foundUser: UserForAuthentication | null;

    try {
        foundUser = await prisma().user.findUnique({
            ...selectSubset,
            include: {
                ...selectSubset.include,
                ...userForAuthenticationInclude,
            },
        });
    } catch (error) {
        throw request.generateError<FindUserErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_USER',
            error
        );
    }

    if (!foundUser) {
        throw request.generateError<FindUserErrorCodes>(httpCodes.NOT_FOUND, 'USER_NOT_FOUND');
    }

    return foundUser as UserForAuthentication;
};
