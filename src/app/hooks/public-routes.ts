import chalk from 'chalk';
import { FastifyInstance } from 'fastify';
import isArray from 'lodash/isArray';

import { PublicRoutes, RouteAuthConfig } from '#app/models';
import { RouteOptionsForConfig } from '#src/augmentations/fastify';

const _publicRoutes: PublicRoutes[] = [];

export async function filterPublicRoutes(
    this: FastifyInstance,
    routeOptions: RouteOptionsForConfig<RouteAuthConfig>
): Promise<void> {
    if (routeOptions.url.match(/^\/api\/latest\/internal/)) {
        return;
    }
    if (!routeOptions.config?.minRole) {
        console.log(
            chalk.magenta(
                `### WARNING: minRole not configured for a public route: ${routeOptions.url}`
            )
        );
    }
    let preHandler: string[] = [];
    if (isArray(routeOptions.preHandler)) {
        preHandler = routeOptions.preHandler.map(handler => handler.name);
    } else {
        if (routeOptions.preHandler) {
            preHandler = [routeOptions.preHandler.name];
        }
    }

    _publicRoutes.push({
        method: routeOptions.method,
        url: routeOptions.url,
        preHandler,
        handler: routeOptions.handler.name,
        config: routeOptions.config,
        logLevel: routeOptions.logLevel,
        attachValidation: routeOptions.attachValidation,
    });
}

export function publicRoutes(): PublicRoutes[] {
    return _publicRoutes;
}
