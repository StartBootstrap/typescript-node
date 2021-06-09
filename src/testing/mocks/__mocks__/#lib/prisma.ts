import { PrismaClient } from '@prisma/client';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

export const mockInitPrisma = jest.fn(() => {});
export const initPrism = mockInitPrisma;

export const prismaMock = mockDeep<PrismaClient>();
export const mockPrisma = jest.fn(() => prismaMock);

export default mockPrisma;

beforeEach(() => {
    mockReset(prismaMock);
});
