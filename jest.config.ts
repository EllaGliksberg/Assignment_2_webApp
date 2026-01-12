/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/controllers/**/*.ts',
        'src/models/**/*.ts',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],
};

export default config;