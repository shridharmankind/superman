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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJmV3FacUlJRjRYaHBydUUyemJCRFQiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIzMDQyMTk3LCJleHAiOjE2MjMwNDU3OTcsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.HCEzoWEhj7-UtGfJfBE47qnlV1z7Ay3fiR6roduVelQhNqCBk6348TsCB15toIfDw_3tgqPbSN_XZRkEGcGG9p83qKHyOCEsIBZtnO97-riHwGt8hRi-eAst5RAOvPa3ntVzIhfHNOslF13XSt2PQWR3qOCa7mgm5LKzZ4VeOdSXaqrt3jmz1MZ7XN0PQcPjigo8hlQPlSih5-GpNKNZEMXwpXANUQkLKnRFlTJ2jswVKE4d6UlbZiGjBj9fZ6XQI5wecvssyipiPec0uNciu6uyhrnhxi3VlrRNks-M_0s0aHhMl6odrRE9zI8ie54448PizTJ4Tbx6QV4zrEKTHQ';
  // return credentials?.password;
};;

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
