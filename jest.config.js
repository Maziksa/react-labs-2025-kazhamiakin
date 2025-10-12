export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // Добавьте эту строку
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(svg|png|jpg|jpeg|gif)$': 'jest-transform-stub'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }]
    },
    modulePaths: ['<rootDir>'],
};