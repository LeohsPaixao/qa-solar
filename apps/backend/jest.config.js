module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  rootDir: '.',
  testRegex: '.*\\.(spec|e2e-spec)\\.ts$',
  testTimeout: 5000,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup-jest.ts'],
  collectCoverageFrom: ['src/modules/**/*.ts'],
  coverageDirectory: './coverage',
  transformIgnorePatterns: ['/node_modules/(?!supertest)'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
