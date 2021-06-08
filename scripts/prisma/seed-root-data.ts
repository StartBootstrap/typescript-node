import { Prisma } from '@prisma/client';

import { RoleName } from '#public-types/admin';

type PartialRole = Prisma.RoleGetPayload<{
    select: { name: true };
}>;

export const allRoles: PartialRole[] = [
    {
        name: RoleName.root,
    },
    {
        name: RoleName.admin,
    },
    {
        name: RoleName.editor,
    },
    {
        name: RoleName.registered,
    },
    {
        name: RoleName.guest,
    },
];

export const rootUser = {
    createUserData: {
        firstName: 'root',
        lastName: 'root',
        email: 'root@root',
        emailConfirmed: true,
    },
    membershipData: {
        roleName: RoleName.root,
    },
};
