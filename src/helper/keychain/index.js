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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJ2aHVhbVhpVDlOfk5jY2hVREpsa18iLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIzMDg5MzI2LCJleHAiOjE2MjM2OTQxMjYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.SjSKUWDxfJxi-R9zqV8jPQS5hrRFpwT0I_OnzzY_bBbheF3KpoTQIdb_qcbMSQOKXbeQ2uFhqIoS7ZWd83Shgj_n7fRbqpZCWt3jxjA8JbOtNUc1UEU645dHynTYkUX_3CD0oPqhHsO-3-U5Kq70m0oPVoRwYH3aDzOvWg-Vk_BGWojj-vIHFx6gXagYvPnVdGGaQt3q1WJJV9jfgbHvbYVxmspa1pYLPHHX-PoGYKh13u4hSjIxJVqJLibcf72pms-2CJqeiUd4WTM20V8HBlAp1FOfdaF0DiSE7uO5l67H-q1PD5bXod4qWAuOSfOGVGtGsSUB0wjlWRgSzYiLKQ';
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
