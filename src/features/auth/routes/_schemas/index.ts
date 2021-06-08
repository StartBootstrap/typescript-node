import * as schemas from './schemas';

export const login = {
    body: schemas.authLoginBodySchema,
    response: {
        200: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                },
            },
        },
    },
};

export const register = {
    body: schemas.authRegisterBodySchema,
    response: {
        204: {
            description: 'Successfully Registered',
            type: 'null',
        },
    },
};
