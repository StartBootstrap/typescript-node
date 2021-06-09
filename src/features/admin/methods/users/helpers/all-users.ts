import httpCodes from '@inip/http-codes';
import { User } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import { AllUsersErrorCodes } from '#features/admin/models';
import prisma from '#lib/prisma';

export const allUsers = async function (request: FastifyRequest): Promise<User[]> {
    let foundUsers: User[];

    try {
        foundUsers = await prisma().user.findMany();
    } catch (error) {
        throw request.generateError<AllUsersErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_USERS',
            error
        );
    }

    if (foundUsers.length === 0) {
        throw request.generateError<AllUsersErrorCodes>(httpCodes.NOT_FOUND, 'USERS_NOT_FOUND');
    }

    return foundUsers;
};
