// import { defaultConfig, mockConfig } from '@mocks/@lib/config';
// import { mockDecorateRequest, mockListen, mockReady, mockRegister } from '@mocks/fastify';
// import { mockCreateWriteStream } from '@mocks/pino-stackdriver';
// import { RunEnvironment } from '@src/lib/config/models';
// import fastify from 'fastify';

// import { FastifyApp } from './index';
// import { routes } from './routes';

// // We do not need to call mock below, since we are manually mocking in @mocks/fastify
// // Calling mock below will create 2 different mocks and mess up the tests
// // jest.mock('fastify');

// jest.mock('./routes', () => {
//     return {
//         __esModule: true,
//         routes: jest.fn(() => {}),
//     };
// });

// const mockedRoutes = routes as jest.MockedFunction<typeof routes>;

// describe('Initializing App', () => {
//     beforeEach(() => {
//         mockedRoutes.mockReset();
//         mockListen.mockReset();
//         mockCreateWriteStream.mockReset();
//     });

//     it('should init and listen', async () => {
//         const app = new FastifyApp();
//         app.listen();
//         expect(fastify).toHaveBeenCalled();
//         expect(mockDecorateRequest).toHaveBeenCalled();
//         expect(mockRegister).toHaveBeenCalled();
//         expect(mockReady).toHaveBeenCalled();
//         expect(mockListen).toHaveBeenCalled();
//     });

//     it('should log on errors', async () => {
//         const mockExit = jest
//             .spyOn(process, 'exit')
//             .mockImplementation((code?: number | undefined): never => {
//                 throw 1;
//             });
//         mockListen.mockImplementation(() => {
//             throw new Error('TEST_ERROR');
//         });
//         const app = new FastifyApp();
//         try {
//             await app.listen();
//         } catch (error) {
//             expect(error).toBe(1);
//         }
//         expect(mockExit).toHaveBeenCalled();
//     });
//     it('should login to Stackdriver in production', () => {
//         mockConfig.mockImplementation(() => ({
//             ...defaultConfig,
//             runEnvironment: RunEnvironment.production,
//         }));
//         const app = new FastifyApp();
//         expect(mockCreateWriteStream).toHaveBeenCalled();
//     });
// });
