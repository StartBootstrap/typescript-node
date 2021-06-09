export default {
    clearMocks: false,
    collectCoverageFrom: ['src/**/*.ts', '!src/lib/orm/entity/**/*.ts', '!src/migrations/**/*.ts'],
    coveragePathIgnorePatterns: [
        'src/index.ts',
        'src/app/routes/internal/testing/.*.ts',
        'src/testing/.*',
        'src/typings/.*',
        'src/data/.*',
        'src/app/models/.*',
    ],
    coverageThreshold: {
        global: {
            branches: 99,
            functions: 99,
            lines: 99,
            statements: -20,
        },
    },
    // extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^#app/(.*)$': '<rootDir>/src/app/index.ts',
        '^#features/(.*)$': '<rootDir>/src/features/$1',
        '^#lib/(.*)$': '<rootDir>/src/lib/$1',
        '^#public-types/(.*)$': '<rootDir>/src/public-types/$1',
        '^#mocks/(.*)$': '<rootDir>/src/testing/mocks/__mocks__/$1',
        '^#src/(.*)$': '<rootDir>/src/$1',
        '^#testing/(.*)$': '<rootDir>/src/testing/$1',
    },
    // Eventually once this is solved https://github.com/facebook/jest/issues/10025
    // preset: 'ts-jest/presets/default-esm',
    preset: 'ts-jest',
    roots: ['<rootDir>/src', '<rootDir>/src/testing/mocks'],
    testEnvironment: 'node',
    transform: {},
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
