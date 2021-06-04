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
  return `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiI3VVRCV3ZEfnVFQzBCYzdXZ2wwUjQiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIyNzk0MTI4LCJleHAiOjE2MjI3OTc3MjgsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.rA4FnnyLhyIW66lfNg3DRFiUEL297JpLIsSkJ7uSAudO1B6hZp93F7xEZg23BmTJWuUrbeX4Qb50HgfLN6GNaPymUSnsMI89vdpmSiWtMEGSD4VlGlyApgsi9XT-u5LSMiH3LQGK9b4stdww50jWDulxY6meFgxlARtlA6SFyhO_Y5X036a7mWleqn0fAcHS_l5-JmaH4Rd0ttNh3ZThD31pQ-XOiktmo3bJIsCvBZRlf6cqwDn5WMLebAY3RgO9O1sLEEcFoF3ij8Rk5dz1XjAx87JNsfZjtwCa9yJGVl4RAf7KLz6ccgtA4A3hpucj1tMr2OUA_aQuSmU9y4K3fg`;
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
