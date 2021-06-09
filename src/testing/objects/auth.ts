import { Auth, AuthLocal, Membership, Post, Prisma, Role, User } from '@prisma/client';

import {
    CreateUserPayload,
    DeleteMultipleUsersPayload,
    ReadMultipleUsersPayload,
    RoleName,
    UpdateUserPayload,
} from '#public-types/admin';
import { DecodedToken, LoginPayload, RegisterPayload, UserForToken } from '#public-types/auth';

type UserForAuth = Prisma.UserGetPayload<{
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

type MembershipForAuth = Prisma.MembershipGetPayload<{
    select: {
        id: true;
        role: {
            select: {
                name: true;
            };
        };
    };
}>;

export class TestUser implements User {
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
    email = 'EMAIL';
    emailConfirmed = false;
    invalidLoginAttempts: number | null = null;
    accountLocked: boolean | null = null;
    postMetaData = {};
    pendingOrganizationAccess = false;
    activeMembership = '00000000-0000-0000-0000-00testmember';
    emailConfirmationToken: string | null = null;
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    auth = new TestAuth();
    authId = '00000000-0000-0000-0000-0000testauth';
    memberships = [new TestMembership()];
    posts: Post[] = [];
}

export class TestUserForAuth implements UserForAuth {
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
    email = 'EMAIL';
    emailConfirmed = false;
    invalidLoginAttempts: number | null = null;
    accountLocked: boolean | null = null;
    postMetaData = {};
    pendingOrganizationAccess = false;
    activeMembership = '00000000-0000-0000-0000-00testmember';
    emailConfirmationToken: string | null = null;
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    auth = new TestAuth();
    authId = '00000000-0000-0000-0000-0000testauth';
    memberships = [new TestMembershipForAuth()];
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

export class TestMembershipForAuth implements MembershipForAuth {
    id = '00000000-0000-0000-0000-00testmember';
    role = { name: RoleName.admin };
}

export class TestMembership implements Membership {
    id = '00000000-0000-0000-0000-00testmember';
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    user = <User>{};
    userId = '00000000-0000-0000-0000-0000testuser';
    role = new TestRole();
    roleId = '00000000-0000-0000-0000-0000testrole';
}

export class TestRole implements Role {
    id = '00000000-0000-0000-0000-0000testrole';
    name!: RoleName;
    createdAt = new Date();
    updatedAt = new Date();
    version = 0;
    memberships: Membership[] = [];
    constructor(roleName = RoleName.editor) {
        this.name = roleName;
    }
}

export const TestAllRoles = [
    new TestRole(RoleName.root),
    new TestRole(RoleName.admin),
    new TestRole(RoleName.editor),
    new TestRole(RoleName.registered),
    new TestRole(RoleName.guest),
];

export class TestDecodedToken implements DecodedToken {
    exp = 1;
    iat = 2;
    id = '00000000-0000-0000-0000-0000testuser';
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
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
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
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

export class TestCreateUserPayload implements CreateUserPayload {
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
    email = 'EMAIL';
    password = 'PASSWORD';
    roleName = RoleName.editor;
}

export class TestUpdateUserPayload implements UpdateUserPayload {
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
    email = 'EMAIL';
    password = 'PASSWORD';
    roleName = RoleName.editor;
}

export class TestRegisterPayload implements RegisterPayload {
    firstName = 'FIRST_NAME';
    lastName = 'LAST_NAME';
    email = 'EMAIL';
    password = 'PASSWORD';
}

export class TestLoginPayload implements LoginPayload {
    email = 'EMAIL';
    password = 'PASSWORD';
}

export class TestDeleteMultipleUsersPayload implements DeleteMultipleUsersPayload {
    userIDs = ['ID1', 'ID2', 'ID3'];
}

export class TestReadMultipleUsersPayload implements ReadMultipleUsersPayload {
    userIDs = ['ID1', 'ID2', 'ID3'];
}
