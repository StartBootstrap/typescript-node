// NOTE: Be sure that the Payload and Response interfaces align with the corresponding schemas
// src/features/auth/routes/_schemas/index.ts

import { Prisma } from '@prisma/client';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export declare type LoginErrorCodes =
    | 'EMAIL_NOT_FOUND'
    | 'INVALID_PASSWORD'
    | 'NO_LOCAL_ACCOUNT'
    | 'PASSWORD_CHANGE_REQUIRED'
    | 'ACCOUNT_LOCKED';

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare type RegisterErrorCodes = 'EMAIL_IN_USE' | 'ERROR_CREATING_USER';

export type UserForToken = Prisma.UserGetPayload<{
    select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        emailConfirmed: true;
        activeMembership: true;
        memberships: {
            select: {
                id: true;
                role: {
                    select: {
                        name: true;
                    }
                }
            },
        };
    };
}>;

export interface DecodedToken extends UserForToken {
    exp: number;
    iat: number;
}

export declare type DeleteAuthErrorCodes =
    | 'ERROR_DELETING_LOCAL_AUTH'
    | 'ERROR_DELETING_FACEBOOK_AUTH'
    | 'ERROR_DELETING_GOOGLE_AUTH'
    | 'ERROR_DELETING_GITHUB_AUTH'
    | 'ERROR_DELETING_TWITTER_AUTH'
    | 'ERROR_DELETING_AUTH'
    ;

export interface TokenResponse {
    token: string;
}

