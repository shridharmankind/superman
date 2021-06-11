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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiI4S0JwcENrbzJPS3RRNjh6dWNXRXIiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIzMzg1MDI5LCJleHAiOjE2MjM5ODk4MjksInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.vICfrqZteSsvOLs7X_c6dHPs1H4vs9pFFGaHuOnhzjUmzBxVVThBHm7kX_29Gq2fQU0WfdybY6nR2RJ5ij89RAO34_rKQArPb10bdqEWEcFNqog2lqhqJOIUv4iHQZCUCEXb7Bbjo3pKF6C-JtJRpcumpHxk4_gymGJd6puRIPS-D-9GLpjmBa2hcRKydBAxh8k3kMaVdYJKZsGzGMtIwwtoN6QFqaYGWerx8iq0mWPMkuqdIg4PykGQvS_6o-wIlszT_T578PEQjQ-tKX4ungMNVk0oSKh1LXcJWKUx36qjD5ISxGbx9CCnvyEV5COo4mAgv0QI82srQpfOxo6NvQ';
  // return credentials?.password;
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
