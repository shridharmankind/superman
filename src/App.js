import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import SplashScreen from 'react-native-splash-screen';

import theme from 'themes';
import {Routes, linking} from 'navigations';
import {getStore} from './store/getStore';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';

const Stack = createStackNavigator();
const store = getStore();

const App = () => {
  LogBox.ignoreAllLogs();

  const isLoggedIn = false;
  const initialRoute = isLoggedIn ? Routes.ROUTE_DASHBOARD : Routes.ROUTE_LOGIN;

  setI18nConfig();

  useEffect(() => {
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
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName={initialRoute}>
            {Routes.default.map(route => (
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
