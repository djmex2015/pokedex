import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/my-angular-app',
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  transform: {
    '\\.html$': [
      'ts-jest',
      {
        stringifyContentPathRegex: /\.html$/,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
    'node_modules/(?!(@angular|rxjs|lodash-es)/)',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
