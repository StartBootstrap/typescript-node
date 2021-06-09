// helpers
export const mockAllUsers = jest.fn(() => [{}]);
export const mockClearInvalidLoginAttempt = jest.fn(() => {});
export const mockCreateUserLocal = jest.fn(() => ({}));
export const mockDeleteUsers = jest.fn(() => ({}));
export const mockFindUser = jest.fn(() => ({}));
export const mockFindUsers = jest.fn(() => [{}]);
export const mockIncreaseInvalidLoginAttempt = jest.fn(() => {});
export const mockSaveUser = jest.fn(() => {});
export const mockUpdateUser = jest.fn(() => {});

export const allUsers = mockAllUsers;
export const clearInvalidLoginAttempt = mockClearInvalidLoginAttempt;
export const createUserLocal = mockCreateUserLocal;
export const deleteUsers = mockDeleteUsers;
export const findUser = mockFindUser;
export const findUsers = mockFindUsers;
export const increaseInvalidLoginAttempt = mockIncreaseInvalidLoginAttempt;
export const saveUser = mockSaveUser;
export const updateUser = mockUpdateUser;

//transforms
export const mockToUserForResults = jest.fn(() => ({}));

export const toUserForResults = mockToUserForResults;
