import prismaClientPkg from '@prisma/client';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { RoleName } from '#public-types/admin';

import { allRoles, rootUser } from './seed-root-data';

const parsedENV = dotenv.config().parsed as dotenv.DotenvParseOutput;

const { PrismaClient } = prismaClientPkg;

const prisma = new PrismaClient();

async function main() {
    console.log(chalk.blue('INFO: Seeding Database with Root Data'));

    console.log(chalk.blue('INFO: Creating Roles'));
    const createdRoles: prismaClientPkg.Role[] = [];
    for (const role of allRoles) {
        const createRole = await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: {
                name: role.name,
            },
        });

        createdRoles.push(createRole);
    }

    console.log(chalk.blue('INFO: Creating Root User'));

    let createdUser = await prisma.user.upsert({
        where: { email: rootUser.createUserData.email },
        update: {},
        create: {
            ...rootUser.createUserData,
            auth: {
                create: {
                    authLocal: {
                        create: {
                            passwordHash: await bcrypt.hash(
                                parsedENV['DB_ROOT_USER_PASSWORD'],
                                Number(parsedENV['BCRYPT_SALT_ROUNDS'])
                            ),
                        },
                    },
                },
            },
        },
        include: {
            memberships: true,
        },
    });
    const foundRole = createdRoles.find(role => role.name === RoleName.root);
    if (!foundRole) {
        throw new Error(`ROLE_NOT_FOUND: ${RoleName.root}`);
    }
    const createdUserMembership = await prisma.membership.create({
        data: {
            roleId: foundRole.id,
        },
        include: {
            role: true,
        },
    });

    createdUser = await prisma.user.update({
        where: {
            id: createdUser.id,
        },
        data: {
            memberships: {
                connect: {
                    id: createdUserMembership.id,
                },
            },
        },
        include: {
            memberships: {},
        },
    });

    console.log(createdUser);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
