import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();
async function main() {
    const allUsers = await prisma.user.findMany({
        include: { posts: true },
    });
    console.log(allUsers[0].posts[0].headerImage);
}
main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
