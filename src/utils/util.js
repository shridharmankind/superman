import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';
import {Linking} from 'react-native';
import {isWeb, KeyChain} from 'helper';
import env from '../../env.json';

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
    const {oneLogin = {}} = env;
    const {revokeUrlBase, revokeUrl, web = {}} = oneLogin;
    const {logoutRedirectURL} = web;

    const url = isWeb()
      ? `${revokeUrlBase}${window.location.origin}${logoutRedirectURL}&id_token_hint=${userToken}`
      : `${revokeUrlBase}${revokeUrl}${userToken}`;

    isWeb() ? window.location.replace(url) : await Linking.openURL(url);
    await KeyChain.resetPassword();
    await AsyncStorage.removeItem(Constants.TOKEN_EXPIRY_TIME);
    await AsyncStorage.removeItem(Constants.USER_ID);
  } catch (error) {}
};

export const isLocalHost = () =>
  ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
