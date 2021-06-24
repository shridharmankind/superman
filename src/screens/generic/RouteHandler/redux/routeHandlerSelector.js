import {createSelector} from '@reduxjs/toolkit';

const userToken = state => state.authState.userToken;
const authScreen = state => state.authState.authScreen;
const userAuthLogout = state => state.authState.logout;

const tokenSelector = createSelector([userToken], token => token);
const authScreenSelector = createSelector([authScreen], screen => screen);
const isUserLogout = createSelector([userAuthLogout], logout => logout);

export const authSelector = {
  getAuthScreen: () => {
    return authScreenSelector;
  },
  getAuthToken: () => {
    return tokenSelector;
  },
  getAuthLogoutStatus: () => {
    return isUserLogout;
  },
};
