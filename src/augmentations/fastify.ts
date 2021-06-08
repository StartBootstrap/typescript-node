import {
    FastifyReply,
    FastifyRequest,
    onRequestHookHandler,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RequestGenericInterface,
    RouteHandlerMethod,
    RouteOptions,
} from 'fastify';
import { LoggerOptions } from 'pino';

declare module 'fastify' {
    interface FastifyInstance {
        // addHook(name: 'preHandler', hook: onRequestHookHandler): Promise<void>;
        printRoutes(options: { commonPrefix: boolean }): string;
    }
}

export type RouteOptionsForConfig<ContextConfig> = RouteOptions<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RequestGenericInterface,
    ContextConfig
>;

// export type RouteHandlerMethodForPlugin = RouteHandlerMethod;

export type RouteHandlerMethodForConfig<
    RequestGenericConfig = RequestGenericInterface
> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RequestGenericConfig
>;

// export type FastifyRequestForParameter<
//     RequestGenericConfig = RequestGenericInterface
// > = FastifyRequest<
//     RequestGenericConfig,
//     RawServerDefault,
//     RawRequestDefaultExpression<RawServerDefault>
// >;

// export type FastifyReplyForParameter<RequestGenericConfig = RequestGenericInterface> = FastifyReply<
//     RawServerDefault,
//     RawRequestDefaultExpression<RawServerDefault>,
//     RawReplyDefaultExpression<RawServerDefault>,
//     RequestGenericConfig
// >;

// export interface AllLoggerOptions extends LoggerOptions {
//     file?: string;
//     stream?: NodeJS.WritableStream | string;
// }
