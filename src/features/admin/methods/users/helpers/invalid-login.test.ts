import { FastifyRequest } from 'fastify';

import { mockSaveUser } from '#mocks/#features/admin/methods/users';
import { mockFastifyInstanceParameter, requestMockWithParams } from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { clearInvalidLoginAttempt, increaseInvalidLoginAttempt } from './invalid-login';

describe('Helpers: Invalid Login', () => {
    beforeEach(() => {
        mockSaveUser.mockReset();
    });
    it('should set invalidLoginAttempts to 1', async () => {
        const testUser = new TestUser();
        await increaseInvalidLoginAttempt.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            testUser
        );
        expect(testUser.invalidLoginAttempts).toEqual(1);
        expect(mockSaveUser).toHaveBeenCalled();
    });
    it('should increase invalidLoginAttempts', async () => {
        const testUser = new TestUser();
        testUser.invalidLoginAttempts = 4;
        await increaseInvalidLoginAttempt.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            testUser
        );
        expect(testUser.invalidLoginAttempts).toEqual(5);
        expect(mockSaveUser).toHaveBeenCalled();
    });
    it('should lock account after 10 attempts', async () => {
        const testUser = new TestUser();
        testUser.invalidLoginAttempts = 10;
        await increaseInvalidLoginAttempt.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            testUser
        );
        expect(testUser.accountLocked).toBeTruthy();
        expect(mockSaveUser).toHaveBeenCalled();
    });
    it('should clear invalidLoginAttempts', async () => {
        const testUser = new TestUser();
        testUser.invalidLoginAttempts = 10;

        await clearInvalidLoginAttempt.call(
            mockFastifyInstanceParameter,
            requestMockWithParams as FastifyRequest,
            testUser
        );
        expect(testUser.invalidLoginAttempts).toEqual(null);
        expect(mockSaveUser).toHaveBeenCalled();
    });
});
