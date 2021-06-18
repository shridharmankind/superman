import 'react-native-gesture-handler';
import * as React from 'react';
import {Alert, LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {Login} from 'screens/generic';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {ROUTE_DASHBOARD, ROUTE_LOGIN} from './navigations/routes';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb, KeyChain} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import {isAccessTokenValid, revokeLogin} from './utils/util';
import {Constants} from 'common';

const Stack = createStackNavigator();
const store = getStore();

export const AuthContext = React.createContext();
const App = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const {authentication} = Constants;
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

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case authentication.RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isSignout: false,
            screen: ROUTE_DASHBOARD,
          };
        case authentication.SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            screen: ROUTE_DASHBOARD,
          };
        case authentication.SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            screen: ROUTE_LOGIN,
          };
        case authentication.REMOVE_TOKEN:
          return {
            ...prevState,
            userToken: null,
          };
      }
    },
    {
      isSignout: false,
      userToken: null,
      screen: ROUTE_LOGIN,
    },
  );

  React.useEffect(() => {
    const restoreLoginToken = async () => {
      try {
        const userToken = await KeyChain.getAccessToken();
        if (userToken && isAccessTokenValid()) {
          setLoggedIn(true);
          dispatch({
            type: Constants.authentication.RESTORE_TOKEN,
            token: userToken,
          });
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    restoreLoginToken();
  }, []);

  React.useEffect(() => {
    const logoutUser = async () => {
      try {
        const userToken = await KeyChain.getAccessToken();
        if (userToken) {
          revokeLogin(userToken);
          dispatch({type: Constants.authentication.REMOVE_TOKEN});
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    if (!isLoggedIn) {
      logoutUser();
    }
  }, [isLoggedIn]);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setLoggedIn(true);
        dispatch({type: Constants.authentication.SIGN_IN, token: data});
      },
      signOut: () => {
        setLoggedIn(false);
        dispatch({type: Constants.authentication.SIGN_OUT});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={state.screen}>
              {!state.userToken ? (
                <Stack.Screen
                  name={authentication.LOGIN}
                  component={Login}
                  options={{
                    headerShown: false,
                  }}
                />
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
