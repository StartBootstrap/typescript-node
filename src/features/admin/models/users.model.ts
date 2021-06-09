import { Prisma } from '@prisma/client';

export type UserForAuthentication = Prisma.UserGetPayload<{
    include: {
        auth: {
            include: {
                authLocal: true;
            };
        };
        memberships: {
            select: {
                id: true;
                role: {
                    select: {
                        name: true;
                    };
                };
            };
        };
    };
}>;

export const userForAuthenticationInclude = {
    auth: {
        include: {
            authLocal: true,
        },
    },
    memberships: {
        select: {
            id: true,
            role: {
                select: {
                    name: true,
                },
            },
        },
    },
};

export type AllUsersErrorCodes = 'ERROR_FINDING_USERS' | 'USERS_NOT_FOUND';
export type FindUserErrorCodes = 'ERROR_FINDING_USER' | 'USER_NOT_FOUND';
export type FindUsersErrorCodes = 'ERROR_FINDING_USERS' | 'NO_USERS_FOUND';
export type SaveUserErrorCodes = 'ERROR_SAVING_USER';
export type UpdateUserErrorCodes = 'ERROR_UPDATING_USER' | 'USER_NOT_FOUND';
