/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};

export default config;
