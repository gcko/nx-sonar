/* eslint-disable */
export default {
  displayName: 'nx-sonar-e2e',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  coverageDirectory: '../../coverage/e2e/nx-sonar-e2e',
  moduleFileExtensions: ['ts', 'js', 'html'],
};
