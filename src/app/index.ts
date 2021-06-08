import chalk from 'chalk';
import fastify, {
    FastifyInstance,
    FastifyLoggerInstance,
    FastifyServerOptions,
    RawServerDefault,
} from 'fastify';
import fastifyCors from 'fastify-cors';
import helmet from 'fastify-helmet';
import { LoggerOptions, stdSerializers } from 'pino';

import { featuresRoutes } from '#features/index';
import config from '#lib/config';

import { generateError, isRegistered, isRoot, verifyMinRole } from './decorators';
import { filterPublicRoutes } from './hooks';
import { bearer } from './plugins';
import { requestSerializer, responseSerializer } from './serializers';

export class FastifyApp {
    _server!: FastifyInstance;

    loggerOptions: LoggerOptions = {
        level: config().logging.level,
        prettyPrint: config().logging.prettyPrint,
        redact: ['req.headers.authorization'],
        serializers: {
            res: responseSerializer,
            req: requestSerializer,
            err: stdSerializers.err,
        },
    };

    constructor() {
        console.log(chalk.blue('### INFO: INITIALIZING FASTIFY APP'));
        console.log(chalk.blue(`\n### INFO: Run Environment is ${config().runEnvironment}\n`));

        this._server = fastify({
            logger: this.loggerOptions,
        } as FastifyServerOptions<RawServerDefault, FastifyLoggerInstance>);

        // Load order -> https://www.fastify.io/docs/latest/Getting-Started/#loading-order-of-your-plugins
        // Fastify Plugins
        this._server.register(helmet);
        this._server.register(fastifyCors);

        // Custom Plugins
        this._server.register(bearer);

        // Decorators
        this._server.decorateRequest('generateError', generateError);
        this._server.decorate('verifyMinRole', verifyMinRole);
        this._server.decorate('isRoot', isRoot);
        this._server.decorate('isRegistered', isRegistered);

        // Hooks & Middleware

        this._server.addHook('onRoute', filterPublicRoutes);

        // Features Routes
        this._server.register(featuresRoutes, { prefix: '/api/latest' });

        this._server.ready(() => {
            console.log('\n');
            console.log(chalk.green(this._server.printRoutes({ commonPrefix: false })));
            console.log(
                chalk.blue(
                    `\n### INFO: HEALTH CHECK: http://0.0.0.0:${config().port}/api/latest/health\n`
                )
            );
        });

        return this;
    }

    listen(): void {
        try {
            this._server.listen(config().port, '0.0.0.0');
        } catch (error) {
            this._server.log.error(error);
            process.exit(1);
        }
    }
}
