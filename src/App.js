import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import AsyncStorage from '@react-native-community/async-storage';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import RouteHandler from './screens/generic/RouteHandler';
import {TASK_NAME} from 'utils/backgroundTask';

const store = getStore();

const App = () => {
  LogBox.ignoreAllLogs();
  // const isLoggedIn = true;
  // const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;
  setI18nConfig();
  React.useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }

    return async () => {
      if (!isWeb()) {
        console.log('removed App js');
        AsyncStorage.removeItem(TASK_NAME);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RouteHandler />
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;
