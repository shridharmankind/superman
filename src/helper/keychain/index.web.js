import AsyncStorage from '@react-native-community/async-storage';
import {ACCESS_TOKEN} from 'common/constants';

export const resetPassword = () => {
  AsyncStorage.removeItem(ACCESS_TOKEN);
};

export const saveAccessToken = async token => {
  await AsyncStorage.setItem(ACCESS_TOKEN, token);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(ACCESS_TOKEN);
};

export const saveDatabaseKey = () => {};

export const getStoredDatabaseKey = () => {};
