import { Feature } from '#app/models';

import { adminRoutes } from './routes';

export const adminFeature: Feature = {
    prefix: 'admin',
    routes: adminRoutes,
};
