import { FastifyApp } from '#app/index';

import { Main } from './main';

jest.mock('#app/index');

test('Main should init', async () => {
    // Appears that this loads the module, calling the Main.init() so we do not need to.
    await Main.init();
    expect(<jest.Mock>FastifyApp).toHaveBeenCalledTimes(1);
});
