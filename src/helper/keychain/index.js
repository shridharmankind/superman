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
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJtYloxWmFSOXExfndRMkhOSzZWNGoiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIzNjY0NDk2LCJleHAiOjE2MjQyNjkyOTYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI5ZGNjNjU2MC05YTkyLTAxMzktMjAyZC0wYTg2OTdmMzllYzcxODY3ODYifQ.in-R8WTZUB6N0zwH1FENVTzzTRSN9bZYmfCE5GDkwoDWppB7VXVVp2tMqaGbH2-BqI4U5elFpmYRfc7L3Pwu2mfq8cua4B60hzFzX87FuAwBszCkkc9439Q6LsSP3X_6ziFk6J-x1Tgl3MWTvb3TAjUSXV039u8sEEkH0LDf1qYxy7A628MGrOqIahwbOJKlspIT5UsrQPYdIiG1ZyL9lycMw3r2v3-xHnnGUIRe1xaPfO8P4zmoJugDk1ndnRF6Av0FhW5HuOckvuVX523RG0Oq7S63jZlZCYvwcV_tMvovVw0ywvbamHgLh-xPlTSuqDR7MOZYq3cY_ZMlXsvS-A';
  //return credentials?.password;
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
