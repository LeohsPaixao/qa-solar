module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!supertest)'],
  testEnvironment: 'node',

  collectCoverage: true,
  collectCoverageFrom: ['src/controllers/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  verbose: true,
};
