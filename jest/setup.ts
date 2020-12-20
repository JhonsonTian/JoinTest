// importing for typescript to have extended type
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import React from 'react';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () => ({
  useAsyncStorage(key: string) {
    return {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
    };
  },
}));
