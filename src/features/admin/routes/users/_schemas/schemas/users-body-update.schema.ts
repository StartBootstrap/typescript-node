export const usersBodyUpdateSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        roleName: { type: 'string' },
    },
};
