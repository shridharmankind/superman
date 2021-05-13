/* eslint-disable no-undef */
import {NativeModules as RNNativeModules} from 'react-native';
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule =
  RNNativeModules.RNGestureHandlerModule || {
    State: {BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END'},
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
  };
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};

// https://github.com/facebook/jest/issues/6434#issuecomment-525576660
jest.useFakeTimers();

jest.mock('react-native-iphone-x-helper', () => {
  return {
    getStatusBarHeight: () => {},
    getBottomSpace: () => {},
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
