import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const DATABASE_KEY = 'DATABASE_KEY';

/*
To reset password, if user log out.
*/
export const resetPassword = async () => {
  await Keychain.resetGenericPassword();
};

/**
This token will be used for all API calls
@ @param {String}- accessToken that will be received once user is authenticated.
*/
export const saveAccessToken = async accessToken => {
  await Keychain.setGenericPassword(ACCESS_TOKEN, accessToken);
};

/**
 Function to get access token
*/
export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  //console.log('Bearer ', credentials?.passxword);
  return credentials?.password;
};

/**
This function is save DB key based on access token
@ @param {String}- accessToken that will be used to generate DB key.
*/
export const saveDatabaseKey = async accessToken => {
  try {
    const dbKey = await getStoredDatabaseKey();
    if (dbKey) {
      return;
    }
    await Keychain.setInternetCredentials(
      DATABASE_KEY,
      DATABASE_KEY,
      accessToken,
    );
  } catch (error) {
    console.log('saveDatabaseKey', error);
  }
};

/**
 Function to get Database key
*/
export const getStoredDatabaseKey = async () => {
  try {
    const dbKey = await Keychain.getInternetCredentials(DATABASE_KEY);
    return dbKey?.password;
  } catch (error) {
    console.log('getStoredDatabaseKey', error);
  }
};
