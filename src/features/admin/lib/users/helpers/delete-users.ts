import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import prisma from '#lib/prisma';
import { DeleteUserErrorCodes } from '#public-types/admin';

export const deleteUsers = async function (
    request: FastifyRequest,
    deleteManyArgs: Prisma.UserDeleteManyArgs
): Promise<void> {
    try {
        await prisma().user.deleteMany(deleteManyArgs);
    } catch (error) {
        throw request.generateError<DeleteUserErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_DELETING_USER',
            error
        );
    }
};
