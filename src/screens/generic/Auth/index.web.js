import {useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {parse} from 'query-string';

import {Routes} from 'navigations';
import {Constants} from 'common';
import {KeyChain} from 'helper';

const Auth = ({navigation}) => {
  useEffect(() => {
    const hash = window.location.hash;

    const saveAccessToken = async token => {
      await KeyChain.saveAccessToken(token);
    };

    if (hash && !hash.includes('error')) {
      const response = parse(hash);
      const decoded = jwt_decode(response.id_token);
      saveAccessToken(response.id_token);

      AsyncStorage.setItem(
        Constants.TOKEN_EXPIRY_TIME,
        JSON.stringify(decoded.exp),
      );
      AsyncStorage.setItem(Constants.USER_ID, decoded.sub);

      navigation.reset({
        routes: [{name: Routes.ROUTE_DASHBOARD}],
      });
    } else {
      navigation.reset({
        routes: [{name: Routes.ROUTE_LOGIN}],
      });
    }
  }, [navigation]);

  return null;
};

export default Auth;
