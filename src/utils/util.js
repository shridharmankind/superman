import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';
import {Alert, Linking} from 'react-native';
import {revoke} from 'react-native-app-auth';

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};

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

export const revokeLogin = async state => {
  const url = `https://mankindpharma-sandbox.onelogin.com/oidc/2/logout?post_logout_redirect_uri=com.superman://callback&id_token_hint=${state.userToken}`
  try {
    await Linking.openURL(url);
    await revoke(config, {
      tokenToRevoke: state.userToken,
      includeBasicAuth: false
    });
  } catch (error) {
    Alert.alert('Failed to revoke token', error.message);
  }
};
