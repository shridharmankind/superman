import {useEffect} from 'react';

import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {parse} from 'query-string';

import {Constants} from 'common';
import {KeyChain} from 'helper';
import {authTokenActions} from '../RouteHandler/redux';
import {ROUTE_DASHBOARD, ROUTE_LOGIN} from 'src/navigations/routes';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;

    const saveAccessToken = async token => {
      await KeyChain.saveAccessToken(token);
    };

    if (hash && !hash.includes('error')) {
      const response = parse(hash);
      const accessToken = response.id_token;
      const decoded = jwt_decode(accessToken);
      saveAccessToken(accessToken);

      AsyncStorage.setItem(
        Constants.TOKEN_EXPIRY_TIME,
        JSON.stringify(decoded.exp),
      );
      AsyncStorage.setItem(Constants.USER_ID, decoded.sub);

      dispatch(
        authTokenActions.signIn({
          userToken: accessToken,
          screen: ROUTE_DASHBOARD,
        }),
      );
    } else {
      dispatch(authTokenActions.updateScreen({screen: ROUTE_LOGIN}));
    }
  }, [dispatch, navigation]);

  return null;
};

export default Auth;
