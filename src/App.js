import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_LOCALAUTHENTICATION,
} from './navigations/routes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import AsyncStorage from '@react-native-community/async-storage';
import {LocalAuthentication} from 'screens/generic';

const store = getStore();

const App = () => {
  LogBox.ignoreAllLogs();
  let isLoggedIn = false;

  setI18nConfig();
  React.useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }
    return () => {
      AsyncStorage.removeItem('isLoggedIn');
    };
  }, []);
  // const initialRoute = isLoggedIn ? ROUTE_LOGIN : ROUTE_LOCALAUTHENTICATION;
  const initialRoute = isLoggedIn ? ROUTE_LOGIN : ROUTE_LOCALAUTHENTICATION;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        {/* <RouteHandler /> */}
        <LocalAuthentication />
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;
