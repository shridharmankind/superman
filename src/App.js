import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import RouteHandler from './screens/generic/RouteHandler';

const store = getStore();

const App = () => {
  LogBox.ignoreAllLogs();
  setI18nConfig();
  React.useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }
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
