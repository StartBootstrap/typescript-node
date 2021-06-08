import prismaClientPkg from '@prisma/client';
import chalk from 'chalk';

const { PrismaClient } = prismaClientPkg;

let _prisma: prismaClientPkg.PrismaClient;

export const initPrism = async (): Promise<void> => {
    console.log(chalk.blue('### INFO: INITIALIZING PRISM'));
    try {
        _prisma = new PrismaClient();
    } catch (error) {
        console.error(error);
    }
};

function prisma(): prismaClientPkg.PrismaClient {
    return _prisma;
}

export default prisma;
