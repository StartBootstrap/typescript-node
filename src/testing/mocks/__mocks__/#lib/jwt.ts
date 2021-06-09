import { TestDecodedToken } from '#testing/objects';

export const mockGenerateToken = jest.fn(() => 'TEST_GENERATED_TOKEN');
export const mockValidateToken = jest.fn(() => new TestDecodedToken());
export const mockGenerateTokenResponse = jest.fn(() => ({ token: 'GENERATED_TOKEN_RESPONSE' }));

export const generateToken = mockGenerateToken;
export const validateToken = mockValidateToken;
export const generateTokenResponse = mockGenerateTokenResponse;
