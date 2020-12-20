module.exports = {
  preset: 'jest-expo',
  cacheDirectory: './jestCache',
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setup.ts',
    // ... other setup files ...
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/jest', // a utility folder
    __dirname, // the root directory
  ],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/src/**/*.(tsx|ts)'],
};
