import httpCodes from '@inip/http-codes';
import { Prisma } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import prisma from '#lib/prisma';
import { DeleteAuthErrorCodes } from '#public-types/auth';

export const deleteAuths = async function (
    request: FastifyRequest,
    deleteManyArgs: Prisma.AuthDeleteManyArgs
): Promise<void> {
    try {
        await prisma().auth.deleteMany(deleteManyArgs);
    } catch (error) {
        throw request.generateError<DeleteAuthErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_DELETING_AUTH',
            error
        );
    }
};

export const deleteAuthLocals = async function (
    request: FastifyRequest,
    deleteManyArgs: Prisma.AuthDeleteManyArgs
): Promise<void> {
    try {
        await prisma().authLocal.deleteMany(deleteManyArgs);
    } catch (error) {
        throw request.generateError<DeleteAuthErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_DELETING_LOCAL_AUTH',
            error
        );
    }
};
