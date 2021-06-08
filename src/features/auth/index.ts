import { Feature } from '#app/models';

import { authRoutes } from './routes';

export const authFeature: Feature = {
    prefix: 'auth',
    routes: authRoutes,
};
