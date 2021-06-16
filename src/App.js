import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {Login} from 'screens/generic';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {ROUTE_DASHBOARD, ROUTE_LOGIN} from './navigations/routes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import {revoke} from 'react-native-app-auth';

const Stack = createStackNavigator();
const store = getStore();
const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};
export const AuthContext = React.createContext();
const App = () => {
  LogBox.ignoreAllLogs();
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

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
            screen: ROUTE_DASHBOARD
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            screen: ROUTE_DASHBOARD
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            // userToken: action.token,
            sessionToken: null,
            screen: ROUTE_LOGIN
          };
        case 'RESTORE_SESSION':
          return {
            ...prevState,
            sessionToken: action.token,
            screen: ROUTE_DASHBOARD
          };
        case 'REMOVE_TOKEN':
          return {
            ...prevState,
            userToken: null
          }
      }
    },
    {
      isSignout: false,
      userToken: null,
      sessionToken: null,
      screen: ROUTE_LOGIN
    }
  );

  revokeLogin = async () => {
    try {
      await revoke(config, {
        tokenToRevoke: state.userToken
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  };

  useEffect(() => {
    if(state.isSignout) {
      revokeLogin();
      dispatch({ type: 'REMOVE_TOKEN', token: null });
    }
  }, [state.isSignout])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT', token: state.userToken }),
      restoreToken: async data => {
        dispatch({ type: 'RESTORE_TOKEN', token: data });
      },
      updateSessionToken: async data => {
        dispatch({ type: 'RESTORE_SESSION', sessionToken: data });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={state.screen}>
              {state.userToken === null || state.isSignout ? (
                <Stack.Screen name="signIn" component={Login} />
              ) : (
                ROUTES.map(route => (
                  <Stack.Screen
                    key={route.name}
                    name={route.name}
                    component={route.component}
                    options={{
                      headerShown: false,
                    }}
                  />
                ))
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </PaperProvider>
      </Provider>
    </AuthContext.Provider>
  );
};

export default App;
