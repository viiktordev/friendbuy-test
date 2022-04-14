const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/core/domain/**/*.logic.ts',
    '<rootDir>/src/app/core/services/**/*.ts',
  ],
  coveragePathIgnorePatterns: ['index.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
};
