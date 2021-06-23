import {ROUTE_LOGIN} from '../../navigations/routes';
import {authenticationConstants} from './constants';
export {authenticationConstants};

export const loginHandlerReducer = (prevState, action) => {
  switch (action.type) {
    case authenticationConstants.RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        screen: action.screen,
      };
    case authenticationConstants.SIGN_IN:
      return {
        ...prevState,
        userToken: action.token,
        screen: action.screen,
      };
    case authenticationConstants.SIGN_OUT:
      return {
        ...prevState,
        screen: ROUTE_LOGIN,
      };
    case authenticationConstants.REMOVE_TOKEN:
      return {
        ...prevState,
        userToken: null,
      };
  }
};
