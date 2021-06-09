import httpCodes from '@inip/http-codes';

import { validateToken } from '#lib/jwt';
import { mockFindUser } from '#mocks/#features/admin/methods/users';
import {
    mockAddHook,
    mockDecorate,
    mockFastifyInstanceParameter,
    mockGenerateError,
    mockReply,
    requestMock,
} from '#mocks/fastify';
import { TestDecodedToken, TestUser } from '#testing/objects';

import { bearerHook, bearerPlugin } from './bearer';

describe('Plugins bearer', () => {
    beforeEach(() => {
        mockFindUser.mockReset();
        (<jest.Mock>validateToken).mockReset();
    });
    it('should decorate the instance and add a hook', () => {
        bearerPlugin(mockFastifyInstanceParameter, {});
        expect(mockAddHook).toHaveBeenCalled();
        expect(mockDecorate).toHaveBeenCalled();
    });
    it('should return if there is no auth header', async () => {
        await bearerHook.call(mockFastifyInstanceParameter, requestMock, mockReply, () => {});
        expect(validateToken).not.toHaveBeenCalled();
    });
    it('should error if auth header does not contain bearer', async () => {
        try {
            await bearerHook.call(
                mockFastifyInstanceParameter,
                {
                    ...requestMock,
                    headers: {
                        authorization: 'asd 123',
                    },
                },
                mockReply,
                () => {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.BAD_REQUEST,
                'BEARER_SCHEMA_REQUIRED'
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if auth token is not valid', async () => {
        const thrownError = new Error('TEST_ERROR');
        (<jest.Mock>validateToken).mockImplementation(() => {
            throw thrownError;
        });
        try {
            await bearerHook.call(
                mockFastifyInstanceParameter,
                {
                    ...requestMock,
                    headers: {
                        authorization: 'bearer 123',
                    },
                },
                mockReply,
                () => {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NOT_AUTHORIZED',
                thrownError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should error if unable to find user from id in decrypted token', async () => {
        (<jest.Mock>validateToken).mockImplementation(() => new TestDecodedToken());
        const testError = new Error('TEST_ERROR');
        mockFindUser.mockImplementation(() => {
            throw testError;
        });
        try {
            await bearerHook.call(
                mockFastifyInstanceParameter,
                {
                    ...requestMock,
                    headers: {
                        authorization: 'bearer 123',
                    },
                },
                mockReply,
                () => {}
            );
        } catch (error) {
            expect(mockGenerateError).toHaveBeenLastCalledWith(
                httpCodes.UNAUTHORIZED,
                'NO_USER',
                testError
            );
            return;
        }
        expect('ERROR SHOULD HAVE BEEN THROWN').toBe(1);
    });
    it('should attach user to the request', async () => {
        const testUser = new TestUser();
        mockFindUser.mockImplementation(() => testUser);
        (<jest.Mock>validateToken).mockImplementation(() => new TestDecodedToken());
        const request = {
            ...requestMock,
            headers: {
                authorization: 'bearer 123',
            },
        };
        await bearerHook.call(mockFastifyInstanceParameter, request, mockReply, () => {});
        expect(request.user).toEqual(testUser);
    });
});

// const validateTokenMock = jest.fn(() => ({} as DecodedToken));
// validateTokenMock.mockImplementationOnce(() => ({} as DecodedToken));

// // https://github.com/facebook/jest/issues/10025
// await import('#lib/jwt').then(({ default: importedObject }) =>
//     Object.defineProperties(importedObject, {
//         validateToken: { value: 'validateTokenMock' },
//     })
// );

// const { bearerHook, bearerPlugin } = await import('./bearer');
