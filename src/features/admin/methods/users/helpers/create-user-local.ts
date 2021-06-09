import httpCodes from '@inip/http-codes';
import bcrypt from 'bcrypt';
import { FastifyRequest } from 'fastify';

import { findUser } from '#features/admin/methods/users';
import { UserForAuthentication, userForAuthenticationInclude } from '#features/admin/models';
import config from '#lib/config';
import prisma from '#lib/prisma';
import { authRandomToken } from '#lib/utility';
import { RoleName } from '#public-types/admin';
import { RegisterErrorCodes, RegisterPayload } from '#public-types/auth';

export const createUserLocal = async function (
    request: FastifyRequest,
    registerPayload: RegisterPayload,
    newRoleName: RoleName = RoleName.registered,
    emailConfirmed = false
): Promise<UserForAuthentication> {
    let userWithEmail: UserForAuthentication | undefined;
    try {
        userWithEmail = await findUser(request, {
            where: { email: registerPayload.email },
        });
    } catch (error) {
        if (error.message !== 'USER_NOT_FOUND') {
            throw request.generateError<string>(
                httpCodes.INTERNAL_SERVER_ERROR,
                `ERROR_FINDING_USER`,
                error
            );
        }
    }

    if (userWithEmail) {
        throw request.generateError<RegisterErrorCodes>(httpCodes.CONFLICT, 'EMAIL_IN_USE');
    }

    const roles = await prisma().role.findMany();

    let createdUser: UserForAuthentication;
    try {
        createdUser = await prisma().user.create({
            data: {
                firstName: registerPayload.firstName,
                lastName: registerPayload.lastName,
                email: registerPayload.email,
                emailConfirmed,
                emailConfirmationToken: !emailConfirmed ? authRandomToken() : undefined,
                auth: {
                    create: {
                        authLocal: {
                            create: {
                                passwordHash: await bcrypt.hash(
                                    registerPayload.password,
                                    config().auth.saltRounds
                                ),
                            },
                        },
                    },
                },
            },
            include: userForAuthenticationInclude,
        });

        const foundRole = roles.find(role => role.name === newRoleName);
        if (!foundRole) {
            throw new Error(`ROLE_NOT_FOUND: ${newRoleName}`);
        }
        const createdUserMembership = await prisma().membership.create({
            data: {
                roleId: foundRole.id,
            },
            include: {
                role: true,
            },
        });

        createdUser = await prisma().user.update({
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
            include: userForAuthenticationInclude,
        });
    } catch (error) {
        throw request.generateError<RegisterErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_CREATING_USER',
            error
        );
    }

    return createdUser;
};
