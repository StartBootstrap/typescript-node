import { UserForToken } from '#public-types/auth';

export declare type AuthErrorCodes =
    | 'NOT_AUTHORIZED'
    | 'NO_USER'
    | 'NO_MEMBERSHIP'
    | 'NO_ROLE'
    | 'BEARER_SCHEMA_REQUIRED'
    | 'ROUTE_NOT_CONFIGURED_FOR_AUTHORIZATION';

export interface DecodedToken extends UserForToken {
    exp: number;
    iat: number;
}
