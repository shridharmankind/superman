import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import {AppState} from 'react-native';
const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  const [isLocalAuthStore, setIsLocalAuth] = React.useState(false);
  LogBox.ignoreAllLogs();
  let isLoggedIn = false;
  const getLocalStrData = async () => {
    let strData = await AsyncStorage.getItem('isLocalAuth');
    console.log('strData', strData);
    if (strData === null) {
      console.log('inside 2');
      setIsLocalAuth(false);
    } else {
      console.log('inside 1');
      setIsLocalAuth(true);
    }
  };
  setI18nConfig();
  useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }
    getLocalStrData();
  }, []);
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOCALAUTHENTICATION;
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            {ROUTES.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  headerShown: false,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;
