import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';
import {Alert, Linking} from 'react-native';
import {revoke} from 'react-native-app-auth';
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
  if (userToken) {
    try {
      const url = Constants.revokeUrl + userToken;
      await Linking.openURL(url);
      await revoke(Constants.config, {
        tokenToRevoke: userToken,
        includeBasicAuth: false,
      });
      await KeyChain.resetPassword();
      await AsyncStorage.removeItem(Constants.TOKEN_EXPIRY_TIME);
    } catch (error) {
      Alert.alert(error.message);
    }
  }
};
