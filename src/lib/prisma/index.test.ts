import { mockPrismaClientConstructor } from '#mocks/@prisma/client';

import prisma, { initPrism } from './index';

describe('Prisma', () => {
    beforeEach(() => {
        mockPrismaClientConstructor.mockReset();
    });

    it('should init', async () => {
        await initPrism();
        expect(mockPrismaClientConstructor).toHaveBeenCalled();
    });
    it('should catch errors when initing', async () => {
        mockPrismaClientConstructor.mockImplementationOnce(() => {
            throw new Error('TEST_ERROR');
        });
        try {
            await initPrism();
        } catch (error) {
            expect(error.message).toEqual('TEST_ERROR');
        }
    });
    it('should return prisma object', async () => {
        await initPrism();
        prisma();
        expect(mockPrismaClientConstructor).toHaveBeenCalled();
    });
});
