export const usersBodyReadMultipleSchema = {
    type: 'object',
    properties: {
        userIDs: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};
