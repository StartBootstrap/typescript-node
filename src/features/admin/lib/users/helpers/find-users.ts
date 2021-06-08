import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import {
    FindUsersErrorCodes,
    UserForAuthentication,
    userForAuthenticationInclude,
} from '#features/admin/models';
import prisma from '#lib/prisma';

export const findUsers = async function (
    request: FastifyRequest,
    selectSubset: Prisma.UserFindManyArgs
): Promise<UserForAuthentication[]> {
    let foundUsers: UserForAuthentication[] | null;

    try {
        foundUsers = await prisma().user.findMany({
            ...selectSubset,
            include: {
                ...selectSubset.include,
                ...userForAuthenticationInclude,
            },
        });
    } catch (error) {
        throw request.generateError<FindUsersErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_USERS',
            error
        );
    }

    if (foundUsers.length === 0) {
        throw request.generateError<FindUsersErrorCodes>(httpCodes.NOT_FOUND, 'NO_USERS_FOUND');
    }

    return foundUsers as UserForAuthentication[];
};
