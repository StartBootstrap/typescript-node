import {
    mockFastifyInstanceParameter,
    mockReply,
    mockRoute,
    mockSend,
    requestMock,
} from '#mocks/fastify';

import { handler, health } from './health';

describe('Plugin health test', () => {
    it('should create health route', () => {
        health(mockFastifyInstanceParameter, {});
        expect(mockRoute).toHaveBeenCalled();
    });
    it('should respond with alive', async () => {
        await handler.call(mockFastifyInstanceParameter, requestMock, mockReply);
        expect(mockSend).toHaveBeenCalledWith('alive');
    });
});
