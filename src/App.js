import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {ROUTE_DASHBOARD, ROUTE_LOGIN} from './navigations/routes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';

const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  LogBox.ignoreAllLogs();
  const isLoggedIn = false;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;
  setI18nConfig();
  useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }
    LocalAuthentication.hasHardwareAsync().then(response => {
      LocalAuthentication.supportedAuthenticationTypesAsync().then(
        response2 => {
          console.log('available', response2);
        },
      );
      LocalAuthentication.getEnrolledLevelAsync().then(response2 => {
        console.log('enrolled - ', response2);

        LocalAuthentication.authenticateAsync().then(response3 => {
          console.log(response3);
          this.props.navigation.navigate('Login');
        });
      });
    });
  }, []);

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
