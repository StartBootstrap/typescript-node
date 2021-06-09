import { jest } from '@jest/globals';
import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerBase,
    RawServerDefault,
    RequestGenericInterface,
} from 'fastify';

import { RouteAuthConfig } from '#app/models';

export const mockAddHook = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorate = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorateReply = jest.fn((name: string, decoration: unknown) => {});
export const mockDecorateRequest = jest.fn((name: string, decoration: unknown) => {});
export const mockListen = jest.fn((port: number, address: string) => {});
export const mockLog = {
    fatal: jest.fn(() => {}),
    error: jest.fn(() => {}),
    warn: jest.fn(() => {}),
    info: jest.fn(() => {}),
    debug: jest.fn(() => {}),
    trace: jest.fn(() => {}),
};
export const mockPrintRoutes = jest.fn(() => {});
export const mockReady = jest.fn((cb: () => void) => {
    console.log('MOCK SERVER READY');
    cb();
});
export const mockRegister = jest.fn((plugin: unknown, options: unknown) => {});
export const mockRoute = jest.fn((options: unknown) => {});

export const mockFastifyInstance = {
    addHook: mockAddHook,
    decorate: mockDecorate,
    decorateReply: mockDecorateReply,
    decorateRequest: mockDecorateRequest,
    listen: mockListen,
    log: mockLog,
    printRoutes: mockPrintRoutes,
    ready: mockReady,
    register: mockRegister,
    route: mockRoute,
} as unknown as FastifyInstance;

export const mockFastifyInstanceParameter: FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>
> = mockFastifyInstance as FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>
>;

export default jest.fn(() => mockFastifyInstance);

export const mockGenerateError = jest.fn(() => {});

export const requestMock = <FastifyRequest>(<unknown>{
    log: mockLog,
    headers: {},
    generateError: mockGenerateError,
});

export const requestMockWithParams = <unknown>{
    log: mockLog,
    headers: {},
    generateError: mockGenerateError,
};

export const mockCode = jest.fn(() => {});
export const mockSend = jest.fn(() => {});
export const mockHeader = jest.fn(() => {});

export const mockReply = {
    code: mockCode,
    send: mockSend,
    header: mockHeader,
} as unknown as MockFastifyReply;

export type MockFastifyReply<
    RequestConfig = RequestGenericInterface,
    RouteConfig = {}
> = FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RequestConfig,
    RouteConfig
>;
