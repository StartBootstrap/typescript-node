export default {
    clearMocks: false,
    collectCoverageFrom: ['src/**/*.ts', '!src/lib/orm/entity/**/*.ts', '!src/migrations/**/*.ts'],
    coveragePathIgnorePatterns: [
        'src/index.ts',
        'src/app/routes/internal/testing/.*.ts',
        'src/testing/.*',
        'src/typings/.*',
        'src/data/.*',
    ],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 99,
            lines: 99,
            statements: -20,
        },
    },
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            useESM: true,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
        '^#app/(.*)$': '<rootDir>/src/app/index.ts',
        '^#features/(.*)$': '<rootDir>/src/features/$1',
        '^#lib/(.*)$': '<rootDir>/src/lib/$1',
        '^#mocks/(.*)$': '<rootDir>/src/testing/mocks/__mocks__/$1',
        '^#src/(.*)$': '<rootDir>/src/$1',
        '^#testing/(.*)$': '<rootDir>/src/testing/$1',
    },
    preset: 'ts-jest',
    roots: ['<rootDir>/src', '<rootDir>/src/testing/mocks'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
