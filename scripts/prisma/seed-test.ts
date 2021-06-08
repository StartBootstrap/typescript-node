import prismaClientPkg from '@prisma/client';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { testUsers } from './seed-test-data';

const parsedENV = dotenv.config().parsed as dotenv.DotenvParseOutput;

const { PrismaClient } = prismaClientPkg;

const prisma = new PrismaClient();

async function main() {
    console.log(chalk.blue('INFO: Seeding Database with Test Data'));

    console.log(chalk.blue('INFO: Creating Users'));

    const roles = await prisma.role.findMany();

    for (const testUser of testUsers) {
        console.log(
            chalk.green(
                `INFO: Creating Test User: ${testUser.createUserData.firstName} ${testUser.createUserData.lastName}`
            )
        );

        let createdUser = await prisma.user.upsert({
            where: { email: testUser.createUserData.email },
            update: {},
            create: {
                ...testUser.createUserData,
                auth: {
                    create: {
                        authLocal: {
                            create: {
                                passwordHash: await bcrypt.hash(
                                    testUser.password,
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
        const foundRole = roles.find(role => role.name === testUser.membershipData.roleName);
        if (!foundRole) {
            throw new Error(`ROLE_NOT_FOUND: ${testUser.membershipData.roleName}`);
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
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
