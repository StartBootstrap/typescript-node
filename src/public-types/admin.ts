import { Prisma } from '@prisma/client';

export enum RoleName {
    root = 'root',
    admin = 'admin',
    editor = 'editor',
    registered = 'registered',
    guest = 'guest',
}

export type UserForResults = Prisma.UserGetPayload<{
    select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        emailConfirmed: true;
    };
}>;

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName: RoleName;
}

export interface UpdateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName: RoleName;
}

export interface DeleteMultipleUsersPayload {
    userIDs: string[];
}

export interface ReadMultipleUsersPayload {
    userIDs: string[];
}


export declare type DeleteMultipleUsersErrorCodes =
    | 'USERS_NOT_FOUND'
    | 'ERROR_FINDING_USERS'
    | 'ERROR_DELETING_USERS';

export declare type DeleteUserErrorCodes =
    | 'USER_NOT_FOUND'
    | 'ERROR_FINDING_USER'
    | 'ERROR_DELETING_USER';

