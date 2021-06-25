import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';
import {Linking} from 'react-native';
import {KeyChain} from 'helper';

export const isAccessTokenValid = async () => {
  const tokenExpiryTime = await AsyncStorage.getItem(
    Constants.TOKEN_EXPIRY_TIME,
  );
  const currentTime = Date.now();
  const diff = currentTime - tokenExpiryTime * 1000;
  if (diff <= 0) {
    return true;
  }
};

export const revokeLogin = async userToken => {
  try {
    const url = Constants.revokeUrl + userToken;
    await Linking.openURL(url);
    await KeyChain.resetPassword();
    await AsyncStorage.removeItem(Constants.TOKEN_EXPIRY_TIME);
  } catch (error) {}
};

export const isLocalHost = () =>
  ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
