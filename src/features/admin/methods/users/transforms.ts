import { User } from '@prisma/client';

import { UserForResults } from '#public-types/admin';

export const toUserForResults = (user: User): UserForResults => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
    };
};
