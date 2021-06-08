export const authRegisterBodySchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', maxLength: 256 },
        lastName: { type: 'string', maxLength: 256 },
        email: { type: 'string', maxLength: 256 },
        password: { type: 'string', maxLength: 64 },
    },
    required: ['firstName', 'lastName', 'email', 'password'],
};
