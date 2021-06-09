import { Auth, AuthLocal, Membership, Post, Prisma, Role, User } from '@prisma/client';

import { RoleName } from '#public-types/admin';
import { DecodedToken, UserForToken } from '#public-types/auth';

type UserMembershipsPosts = Prisma.UserGetPayload<{
    select: {
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
        posts: true;
    };
}>;

type MembershipIdRole = Prisma.MembershipGetPayload<{
    select: {
        id: true;
        role: true;
    };
}>;

export class TestUser implements UserMembershipsPosts {
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'TEST@TEST.COM';
    emailConfirmed = false;
    invalidLoginAttempts: number | null = null;
    accountLocked: boolean | null = null;
    postMetaData = {};
    pendingOrganizationAccess = false;
    activeMembership: string | null = null;
    emailConfirmationToken: string | null = null;
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    auth = new TestAuth();
    authId = '00000000-0000-0000-0000-0000testauth';
    memberships = [new TestMembership()];
    posts: Post[] = [];
}

export class TestAuth implements Auth {
    id = '00000000-0000-0000-0000-0000testauth';
    user = {} as User;
    authLocal = new TestAuthLocal();
    localId = '00000000-0000-0000-0000-000testlocal';
}

export class TestAuthLocal implements AuthLocal {
    id = 'ID';
    passwordHash = 'PASSWORD_HASH';
    emailConfirmationToken = 'EMAIL_CONFIRMATION_TOKEN';
    passwordChangeRequired = false;
    passwordResetToken: string | null = null;
    auth = {} as Auth;
}

export class TestMembership implements MembershipIdRole {
    id = '00000000-0000-0000-0000-00testmember';
    role = new TestRole();
}

export class TestRole implements Role {
    id = '00000000-0000-0000-0000-0000testrole';
    name = RoleName.admin;
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    memberships: Membership[] = [];
}

export class TestDecodedToken implements DecodedToken {
    exp = 1;
    iat = 2;
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'EMAIL';
    emailConfirmed = false;
    activeMembership = '00000000-0000-0000-0000-00testmember';
    memberships = [
        {
            id: '00000000-0000-0000-0000-00testmember',
            role: { name: RoleName.admin },
        },
    ];
}
export class TestUserForToken implements UserForToken {
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'EMAIL';
    emailConfirmed = false;
    activeMembership = '00000000-0000-0000-0000-00testmember';
    memberships = [
        {
            id: '00000000-0000-0000-0000-00testmember',
            role: { name: RoleName.admin },
        },
    ];
}
