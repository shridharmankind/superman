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
  // return credentials?.password;
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiI3TEpHTGtjVmt-SXZPQ1paRWFMazciLCJzdWIiOiIxMzM4NzQzMzgiLCJpc3MiOiJodHRwczovL3N1cGVybWFuLWRldi5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIxNTA2NTg1LCJleHAiOjE2MzcwNTg1ODUsInNjb3BlIjoib3BlbmlkIiwiYXVkIjoiNzAyZTc4NzAtOGJlNi0wMTM5LTJmZmItMDY1YzAxZDBhMjNkMTg5Mjk2In0.hq5q5_ggP1c_WyM3tJDEsfrMP7K7C_fCxMyyPa9sKXC4YE62XY3_v9HQPkf1bJgkZ1a0-wKfkG58T-09Gs_lJdnvgt9f-z9v89lNP1pkZzvRo_9qnnq0O8NkyaTF0u1ZGjcyQl_ybNOLe0xJZE3IfaYlKF4dcA10A-09F1_PwuIy3rw9GV4pkryAdiOX1HIiAeUXlHsapiBpYd2qPbinyR9ovjdwq9Akb5XhN2TQTa-mgKVmzWyVBPrRqzqt9IibwjvlNc5-wyDXT9b6Tz8jp1Ubs4pF_3d4ZNgNT8l5uat8gGau16ZtB3fuJ08FYAzz2fq-wdt829XZF-Mv2HJEBQ';
};

/**
This function is save DB key based on access token
@ @param {String}- accessToken that will be used to generate DB key.
*/
export const saveDatabaseKey = async accessToken => {
  const dbKey = await getDatabaseKey();
  if (dbKey) {
    return;
  }
  await Keychain.setInternetCredentials(
    DATABASE_KEY,
    DATABASE_KEY,
    accessToken,
  );
};

/**
 Function to get Database key
*/
export const getDatabaseKey = async () => {
  const dbKey = await Keychain.getInternetCredentials(DATABASE_KEY);
  return dbKey?.password;
};
