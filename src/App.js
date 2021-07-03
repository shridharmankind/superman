import 'react-native-gesture-handler';
import React from 'react';
// import {LogBox} from 'react-native';

import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import theme from 'themes';
import AsyncStorage from '@react-native-community/async-storage';
import {getStore} from './store/getStore';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';

import {Toast} from 'components/widgets';
import ErrorBoundary from 'screens/generic/ErrorBoundary';
import RouteHandler from './screens/generic/RouteHandler';
import {TASK_NAME} from 'utils/backgroundTask';

const store = getStore();

const App = () => {
  // LogBox.ignoreAllLogs(); // enable this for demo
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
        AsyncStorage.removeItem(TASK_NAME);
      }
    };
  }, []);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <RouteHandler />
          <Toast />
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
