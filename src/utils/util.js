import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';

export const isAccessTokenValid = async () => {
  const tokenExpiryTime = await AsyncStorage.getItem(
    Constants.TOKEN_EXPIRY_TIME,
  );
  console.log('Manoj1', tokenExpiryTime);
  const currentTime = Date.now();
  const diff = currentTime - tokenExpiryTime * 1000;
  if (diff <= 0) {
    return 11;
  }
  return 10;
};
