import {createSlice} from '@reduxjs/toolkit';
import {ROUTE_LOGIN} from '../../../../navigations/routes';

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
        authScreen: payload.screen,
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
    updateScreen: (prevState, action) => {
      const {payload} = action;
      return {
        ...prevState,
        authScreen: payload.screen,
      };
    },
  },
});

export const authTokenActions = authLoginHandler.actions;
export const authTokenReducer = authLoginHandler.reducer;
