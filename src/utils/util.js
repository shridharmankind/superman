import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';

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

export const isLocalHost = () => {
  if (['localhost', '127.0.0.1', ''].includes(window.location.hostname)) {
    return true;
  } else {
    return false;
  }
};
