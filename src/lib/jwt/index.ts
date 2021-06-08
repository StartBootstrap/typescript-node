import jwt from 'jsonwebtoken';
import moment from 'moment';

import { UserForAuthentication } from '#features/admin/models';
import { DecodedToken } from '#features/auth/models';
import config from '#lib/config';
import { UserForToken } from '#public-types/auth';

export declare type Token = string;
export interface TokenResponse {
    token: Token;
}

export function generateTokenResponse(user: UserForAuthentication): TokenResponse {
    const expires = moment().add(config().auth.jwtTokenExpiration, 'days').unix();

    return {
        token: jwt.sign(
            {
                ...userForToken(user),
                exp: expires,
            },
            config().auth.jwtSecret
        ),
    };
}

export function validateToken(token: string): DecodedToken {
    return <DecodedToken>jwt.verify(token, config().auth.jwtSecret);
}

export default function userForToken(user: UserForAuthentication): UserForToken {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        hasSocialAuth: user.hasSocialAuth,
        activeMembership: user.activeMembership,
        memberships: user.memberships,
    };
}
