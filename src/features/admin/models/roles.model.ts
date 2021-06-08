import { RoleName } from '#public-types/admin';

export type RoleNameValues = { [index in RoleName]: number };

export const roleNameValues: RoleNameValues = {
    root: 0,
    admin: 10,
    editor: 20,
    registered: 30,
    guest: 40,
};
