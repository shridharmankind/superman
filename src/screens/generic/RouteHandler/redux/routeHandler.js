import {createSlice} from '@reduxjs/toolkit';
import {Helper} from 'database';
import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_MASTER_DATA_DOWNLOAD,
} from '../../../../navigations/routes';

export const authInitialState = {
  userToken: null,
  authScreen: ROUTE_LOGIN,
  logout: false,
};

const authLoginHandler = createSlice({
  name: 'ROUTE_HANDLER',
  initialState: authInitialState,
  reducers: {
    signIn: (prevState, action) => {
      const {payload} = action;
      return {
        ...prevState,
        userToken: payload.userToken,
        authScreen: isMasterDataDownloaded()
          ? ROUTE_DASHBOARD
          : ROUTE_MASTER_DATA_DOWNLOAD,
        logout: false,
      };
    },
    signOut: prevState => {
      return {
        ...prevState,
        authScreen: ROUTE_LOGIN,
        logout: true,
      };
    },
    removeToken: prevState => {
      return {
        ...prevState,
        userToken: null,
      };
    },
  },
});

export const authTokenActions = authLoginHandler.actions;
export const authTokenReducer = authLoginHandler.reducer;

const isMasterDataDownloaded = async () => {
  const isPending = await Helper.checkForPendingMasterDataDownload();
  return isPending;
};
