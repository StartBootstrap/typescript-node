import { authRandomToken } from './token';

describe('@Lib Utils isSameID', () => {
    it('shoudl generate a 12 character unique token', async () => {
        expect(authRandomToken()).toMatch(/\w{4}-\w{4}-\w{4}/);
    });
});
