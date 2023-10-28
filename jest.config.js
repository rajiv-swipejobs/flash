const path = require('path');
const recursiveReadSync = require('recursive-readdir-sync');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const esModules = ['lodash-es', '@material-ui'].join('|');

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-babel',
  roots: ['src'],
  testResultsProcessor: 'jest-sonar-reporter',
  setupFiles: ['./test/jest-setup.ts', ...recursiveReadSync(path.join(__dirname, 'src/test'))],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.(js|tsx|ts)$': 'babel-jest',
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esModules}))`],
  testRegex: '(/__tests__/.*(!test_disabled)|\\.(test|spec))\\.(ts|tsx|js)$',
  globals: {
    '@swc/jest': {
      tsconfig: './tsconfig.json',
    },
  },
  moduleDirectories: ['<rootDir>', 'node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dtos/',
    '/models/',
    '/src/bootstrap.tsx',
    '/src/defs.d.ts',
    '/src/core.defs.d.ts',
    '/src/constants.ts',
    '/src/index.ts',
    '/src/Sample.tsx',
  ],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/test/*.{js,ts,tsx}', '!src/**/__tests__/'],
};
