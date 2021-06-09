import fastify from 'fastify';

import { mockDecorateRequest, mockListen, mockReady, mockRegister } from '#mocks/fastify';
import { mockCreateWriteStream } from '#mocks/pino-stackdriver';

import { FastifyApp } from './index';

describe('Initializing App', () => {
    beforeEach(() => {
        mockListen.mockReset();
        mockCreateWriteStream.mockReset();
    });

    it('should init and listen', async () => {
        const app = new FastifyApp();
        app.listen();
        expect(fastify).toHaveBeenCalled();
        expect(mockDecorateRequest).toHaveBeenCalled();
        expect(mockRegister).toHaveBeenCalled();
        expect(mockReady).toHaveBeenCalled();
        expect(mockListen).toHaveBeenCalled();
    });

    it('should log on errors', async () => {
        const mockExit = jest
            .spyOn(process, 'exit')
            .mockImplementation((code?: number | undefined): never => {
                throw 1;
            });
        mockListen.mockImplementation(() => {
            throw new Error('TEST_ERROR');
        });
        const app = new FastifyApp();
        try {
            await app.listen();
        } catch (error) {
            expect(error).toBe(1);
        }
        expect(mockExit).toHaveBeenCalled();
    });
});
