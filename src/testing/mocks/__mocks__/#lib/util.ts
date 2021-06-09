export const mockConfirmationToken = jest.fn(() => {});
export const mockFirstLastFromString = jest.fn(() => ['TEST_FIRST', 'TEST_LAST']);
export const mockIsSameID = jest.fn(() => true);
export const mockVerifyOrigin = jest.fn(() => true);
export const mockVerifyToken = jest.fn(() => {});

export const authRandomToken = mockConfirmationToken;
export const firstLastFromString = mockFirstLastFromString;
export const isSameID = mockIsSameID;
export const verifyGoogleRecaptchaToken = mockVerifyToken;
export const verifyOrigin = mockVerifyOrigin;
