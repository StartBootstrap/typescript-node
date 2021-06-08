export const authLoginBodySchema = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 256 },
        password: { type: 'string', maxLength: 64 },
    },
    required: ['email', 'password'],
};
