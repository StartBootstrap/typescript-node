export const usersBodyFindSchema = {
    type: 'object',
    properties: {
        where: {
            type: ['object'],
        },
        orderBy: {
            type: ['object', 'array'],
        },
        skip: { type: 'number' },
        cursor: { type: ['object'] },
        take: { type: 'number' },
        select: {
            type: ['object'],
        },
        include: {
            type: ['object'],
        },
        distinct: {
            type: ['object'],
        },
    },
};
