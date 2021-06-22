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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiI3endTUFVOVzNYTnBXWFNrcmp-MkoiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjI0MzM4NjA1LCJleHAiOjE2MjQ5NDM0MDUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI0OWVjODZmMC05NmFhLTAxMzktYTlmNS0wMmMyNzMxYTFjNDkxODY3ODYifQ.fwM60yeU7S8gT6QsP0duJYJ5Pc7XWS-RlRGcMnfSxr6ExvGQK09hX-3Fus9YPmIhFjWI9XZXJbXUUIlcZYvy3OEqguxVXO10g23r97D2ks0C0lyCWkdlPhlNWPNrIyH8ERTQSXtK3HlACPgsbB76EWdJM4PmF0yn-gwr7s8LKtSOKevmPLFrUUl1Pk284hE8M7padRA3sZ8HswP1S_YtKr0j0oiire-6jrqxk6djN5bNrHVd1VIinkAikGdEn0Psaad7E-SIazUg8K5UYaUOQ_fgxD8hKmeueWoexJb-cMUs-D4wKwH6uQr6ri_FEAZm6AgzHEdiOyV37qZVhddVJw';
  //return credentials?.password;
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
