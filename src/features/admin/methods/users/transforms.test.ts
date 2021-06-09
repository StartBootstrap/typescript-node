import { mockFindUser } from '#mocks/#features/admin/methods/users';
import { mockCode } from '#mocks/fastify';
import { TestUser } from '#src/testing/objects';

import { toUserForResults } from './transforms';

describe('Users Transforms:', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        mockCode.mockReset();
    });

    it('should transform User into UserForResults', async () => {
        const testUser = new TestUser();
        const results = toUserForResults(new TestUser());
        expect(results).toEqual({
            id: testUser.id,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            emailConfirmed: testUser.emailConfirmed,
        });
    });
});
