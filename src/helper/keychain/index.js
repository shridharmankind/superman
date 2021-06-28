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
  //console.log('Bearer ', credentials?.password);
  return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiJQdkdBQ0hieFM1THdaNTVtV1JBa1YiLCJzdWIiOiIxMzU1NDc3OTMiLCJpc3MiOiJodHRwczovL21hbmtpbmRwaGFybWEtc2FuZGJveC5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjI0ODEyMjExLCJleHAiOjE2MjU0MTcwMTEsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdWQiOiI0OWVjODZmMC05NmFhLTAxMzktYTlmNS0wMmMyNzMxYTFjNDkxODY3ODYifQ.jGCWh0H8l18lTPjZ186bJVzxmTOMs_c8UqDxIwn1RnJT1-6VLcAHsgTJuySlCDEGk17b9eCUs18SAfdq3ovRwenBQLr9Mi_K4VjPzhvNMmO3lOw96jIYtwo1zEAgAvuOurSCg0Ib8_EBJmeEmdpm3hQLuHiX9QipURnCVei3aKuikNDvAlL9NlJ8BuGnQXegso4RNoP8wsR_GzGiXEfIwCMy7o_hGgG7WRL73YV2xc_uNcnyFRRCRnH_zO5jx46fjoo0ezonvV5CcLHohO-3QAuWpOiFY1Pec6nhSOTMwUMlhTwW969uRVP-XVi7zQkZ6PaM-wq60LQ4wOTn-XTuiA';
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
