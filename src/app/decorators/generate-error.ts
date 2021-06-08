import { FastifyRequest } from 'fastify';

import { GeneratedError } from '#app/models';

declare module 'fastify' {
    interface FastifyRequest {
        generateError<T>(
            statusCode: number,
            message: T,
            thrownError?: Error,
            detailMessage?: string
        ): void;
    }
}

export function generateError(
    this: FastifyRequest,
    statusCode: number,
    message: string,
    thrownError?: Error,
    detailMessage?: string
): GeneratedError {
    if (thrownError) {
        this.log.error(thrownError.message);
    }
    let errorMessage = message;
    if (detailMessage) {
        errorMessage += ` : ${detailMessage}`;
    }
    const err: GeneratedError = new Error(errorMessage) as GeneratedError;
    err.statusCode = statusCode;
    return err;
}
