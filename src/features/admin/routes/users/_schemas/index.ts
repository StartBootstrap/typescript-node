import * as globalSchemas from '#app/models';

import * as schemas from './schemas';

export const usersAll = {
    response: {
        200: {
            type: 'array',
            items: schemas.usersResponseObjectSchema,
        },
    },
};
export const usersCreate = {
    body: schemas.usersBodyCreateSchema,
    response: {
        201: schemas.usersResponseObjectSchema,
    },
};
export const usersDelete = {
    params: globalSchemas.paramsIDSchema,
    response: {
        204: {
            description: 'Successfully deleted',
            type: 'null',
        },
    },
};
export const usersDeleteMultiple = {
    body: schemas.usersBodyDeleteMultipleSchema,
    response: {
        204: {
            description: 'Successfully deleted',
            type: 'null',
        },
    },
};
export const usersRead = {
    params: globalSchemas.paramsIDSchema,
    response: {
        200: schemas.usersResponseObjectSchema,
    },
};
export const usersReadMultiple = {
    body: schemas.usersBodyReadMultipleSchema,
    response: {
        200: {
            type: 'array',
            items: schemas.usersResponseObjectSchema,
        },
    },
};
export const usersUpdate = {
    params: globalSchemas.paramsIDSchema,
    body: schemas.usersBodyUpdateSchema,
    response: {
        200: schemas.usersResponseObjectSchema,
    },
};
export const usersFind = {
    body: schemas.usersBodyFindSchema,
    response: {
        200: {
            type: 'array',
            items: schemas.usersResponseObjectSchema,
        },
    },
};
