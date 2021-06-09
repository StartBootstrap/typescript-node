import httpCodes from '@inip/http-codes';
import { FastifyRequest } from 'fastify';

import {
    SaveUserErrorCodes,
    UserForAuthentication,
    userForAuthenticationInclude,
} from '#features/admin/models';
import prisma from '#lib/prisma';

export const saveUser = async function (
    request: FastifyRequest,
    userForAuthentication: UserForAuthentication
): Promise<UserForAuthentication> {
    // Need to remove included relations before saving data object
    // eslint-disable-next-line
    const { auth, memberships, ...user } = userForAuthentication;
    let savedUser: UserForAuthentication | null;
    try {
        savedUser = await prisma().user.update({
            where: {
                id: user.id,
            },
            data: user,
            include: userForAuthenticationInclude,
        });
    } catch (error) {
        throw request.generateError<SaveUserErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_SAVING_USER',
            error
        );
    }

    return savedUser;
};
