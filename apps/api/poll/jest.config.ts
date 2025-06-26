import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('../../../tsconfig.base.json');

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '../../../', 
  testRegex: '.*\\.spec\\.ts$',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/apps/api/poll/tsconfig.spec.json',
      },
    ],
  },
};