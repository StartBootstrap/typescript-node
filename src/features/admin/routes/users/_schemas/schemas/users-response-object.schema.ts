export const usersResponseObjectSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        emailConfirmed: { type: 'boolean' },
    },
};
