import { enumKeys } from './enum-keys';

enum TestEnum {
    a = 'a',
    b = 'b',
    c = 'c',
}

describe('@Lib Utils enumKeys', () => {
    it('should return the keys of an enum', () => {
        const results = enumKeys(TestEnum);
        expect(results).toEqual(['a', 'b', 'c']);
    });
});
