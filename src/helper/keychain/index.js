import * as Keychain from 'react-native-keychain';

export const resetPassword = async () => {
  await Keychain.resetGenericPassword();
};

export const saveAccessToken = async accessToken => {
  await Keychain.setGenericPassword('idToken', accessToken);
};
