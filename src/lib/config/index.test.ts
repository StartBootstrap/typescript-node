import config from './index';

describe('Config', () => {
    it('should export a function that renders a config object', () => {
        expect(config()).toBeDefined();
    });
});
