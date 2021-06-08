import { mockSign, mockVerify } from '@mocks/jsonwebtoken';
import { TestUserForToken } from '@start-bootstrap/website-shared-types';
import { TestMembership, TestUser } from '@testing/objects';

import userForToken, { generateTokenResponse, validateToken } from './index';

jest.mock('jsonwebtoken');

describe('JWT', () => {
    it('should generate a token', () => {
        generateTokenResponse(new TestUser());
        expect(mockSign).toHaveBeenCalled();
    });
    it('should validate a token', () => {
        validateToken('TEST_TOKEN');
        expect(mockVerify).toHaveBeenCalled();
    });
    it('should create a UserForToken from User', () => {
        const results = userForToken(new TestUser());
        expect(results).toEqual(new TestUserForToken());
    });
    it('should create a UserForToken with activeMembership from User', () => {
        const testUser = new TestUser();
        testUser.activeMembership = '00000000-0000-0000-0000-00testmember';
        const results = userForToken(testUser);
        expect(results).toEqual({
            ...new TestUserForToken(),
            activeMembership: '00000000-0000-0000-0000-00testmember',
        });
    });
    it('should handle possible null email', () => {
        const testUser = new TestUser();
        testUser.email = '';
        const results = userForToken(testUser);
        expect(results).toBeDefined();
    });
    it('should handle possible null memberships', () => {
        const testUser = new TestUser();
        delete testUser.memberships;
        const results = userForToken(testUser);
        expect(results).toBeDefined();
    });
    it('should handle possible null groups', () => {
        const testUser = new TestUser();
        const testMembership = new TestMembership();
        delete testMembership.groups;
        testUser.memberships = [testMembership];
        const results = userForToken(testUser);
        expect(results).toBeDefined();
    });
});