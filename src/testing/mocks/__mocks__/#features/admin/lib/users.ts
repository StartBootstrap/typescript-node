// helpers
export const mockAllUsers = jest.fn(() => [{}]);
export const mockCreateUserLocal = jest.fn(() => ({}));
export const mockFindUser = jest.fn(() => ({}));
export const mockFindUsers = jest.fn(() => [{}]);
export const mockSaveUser = jest.fn(() => {});

export const allUsers = mockAllUsers;
export const createUserLocal = mockCreateUserLocal;
export const findUser = mockFindUser;
export const findUsers = mockFindUsers;
export const saveUser = mockSaveUser;

//transforms
export const mockToUserForResults = jest.fn(() => ({}));

export const toUserForResults = mockToUserForResults;