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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJQRWxyZGRkaUM1c1ZNUkpTVmlQdXgiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIzNzMzMzE4LCJleHAiOjE2MjQzMzgxMTgsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.h5KNDOygg6p8MeZkqZNCqL1oqkMhUK-wuUoyEfOV-FmN-D6rfI4T2eiKDfju-iUws3Pz0_HHEAH64d2ko6VWYRXtoDnv5y4Mca99UIIfWAkCw6R1LLzeM9QzwzKbMQp8MhVsohe8K4hy2J5rpsDMcgwJnAo_ooEDQLTTdxoFP3SXnt3qP5h7L1jHTUHISewM2lgcxLB8W-uUyOfFSvfT5xMgsnnQv1dtiG0tYPoRCZeRzDCjgTn58eXz_aDohQlMv2_eQg4sw71PPhhcoyYwh1NBzLkGkW_yETNWR10DRrG9i-z529wt_5Q1jAvxUNU9SYg_t0DdEo_j_wEsB_lTMA';
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
