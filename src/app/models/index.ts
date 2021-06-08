import { FastifyPluginAsync, HTTPMethods } from 'fastify';

import { RoleName } from '#public-types/admin';

export interface PublicRoutes {
    method: HTTPMethods | HTTPMethods[];
    url: string;
    preHandler: string[];
    handler: string;
    config: { minRole: string } | undefined;
    logLevel: string | undefined;
    attachValidation: boolean | undefined;
}

export interface Feature {
    prefix: string;
    routes: FastifyPluginAsync;
}

export interface GeneratedError extends Error {
    statusCode: number;
}

export interface RouteAuthConfig {
    minRole: RoleName;
}

export const paramsIDSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
    },
};
