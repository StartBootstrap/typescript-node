import pkg from '@prisma/client';
import chalk from 'chalk';

interface PsqlExtension {
    oid: number;
    extname: string;
    extowner: number;
    extnamespace: number;
    extrelocatable: boolean;
    extversion: string;
    extconfig?: unknown;
    extcondition?: unknown;
}

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    const results: PsqlExtension[] = await prisma.$queryRaw('select * from pg_extension;');
    if (!results.find(result => result.extname === 'uuid-ossp')) {
        console.log(chalk.magenta(`### INFO: uuid-ossp extension not found. Loading it...`));
        await prisma.$queryRaw('CREATE EXTENSION "uuid-ossp";');
        const secondResults: PsqlExtension[] = await prisma.$queryRaw(
            'select * from pg_extension;'
        );
        return console.log(secondResults);
    }
    console.log(chalk.blue(`### INFO: uuid-ossp extension is already loaded`));
    console.log(results);
}
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
