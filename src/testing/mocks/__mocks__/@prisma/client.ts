export const mockPrismaClientConstructor = jest.fn(() => {});
class MockPrismaClient {
    constructor() {
        mockPrismaClientConstructor();
    }
}

export const prismaClientPkg = {
    PrismaClient: MockPrismaClient,
};

export default prismaClientPkg;
