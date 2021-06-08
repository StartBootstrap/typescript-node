export const usersBodyDeleteMultipleSchema = {
    type: 'object',
    properties: {
        usersIDs: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};
