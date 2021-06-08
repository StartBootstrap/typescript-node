import chalk from 'chalk';
import { FastifyPluginAsync } from 'fastify';

import { health } from '#app/plugins';

import { adminFeature } from './admin';
import { authFeature } from './auth';

export const features = [adminFeature, authFeature];

export const featuresRoutes: FastifyPluginAsync = async function (instance): Promise<void> {
    instance.register(health);

    for (const feature of features) {
        console.log(chalk.green(`### INFO: Loading routes for ${feature.prefix}`));
        instance.register(feature.routes, { prefix: `/${feature.prefix}` });
    }
};
