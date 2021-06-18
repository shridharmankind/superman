import {useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {parse} from 'query-string';

import {Routes} from 'navigations';
import {TOKEN_EXPIRY_TIME, USER_ID} from 'screens/generic/Login';

const Auth = ({navigation}) => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !hash.includes('error')) {
      const response = parse(hash);
      const decoded = jwt_decode(response.id_token);

      AsyncStorage.setItem(TOKEN_EXPIRY_TIME, JSON.stringify(decoded.exp));
      AsyncStorage.setItem(USER_ID, decoded.sub);

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
