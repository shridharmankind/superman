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
  // return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJiUVJORUF-eTNOWXlKRWpkM2xqUnQiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIyNzg5MDg1LCJleHAiOjE2MjI3OTI2ODUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.If3hFDTEIi-qKaf8r_q1jkXg_g19h70_C7Oh9biO8Tvpj-5fRCfSlzfX8ARSq_2WZjmA6vZXuWXLjj541mKwiSVKD_wLcYBT082gJGoX1Trk_HYbvJ0qw6rBBn1H8XcKSW_iTaWjCkcM48JHzY5AyaQTJ24iHMaj7bZ7c-n_uw_-76SDoCOni2m8yTd-k36IKT2EAPH4rj2ou6eF24Nc2trjc9LnsHN1CG_r4AEnFFojxjDRf86n1IrtQ-m6MpxwOB8F2evOC4L7EeAPqHIeXfYr-4ZzZ_AFm8tpiygfFYiZ9mVYqm5k4l2fL1a1_enLB4bpnF8z8_9mILbhZeosHQ';
  return credentials?.password;
};;

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
