import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {Login} from 'screens/generic';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_MASTER_DATA_DOWNLOAD,
} from './navigations/routes';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb, KeyChain} from 'helper';
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import {isAccessTokenValid, revokeLogin} from './utils/util';
import {Helper} from 'database';
import {
  loginHandlerReducer,
  authenticationConstants,
} from './utils/loginHandler/loginHandle.reducer';

const Stack = createStackNavigator();
const store = getStore();

export const AuthContext = React.createContext();
const App = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const [state, dispatch] = React.useReducer(loginHandlerReducer, {
    userToken: null,
    screen: ROUTE_LOGIN,
  });
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

  React.useEffect(() => {
    updateTokenAndScreen(authenticationConstants.RESTORE_TOKEN);
  }, []);

  React.useEffect(() => {
    const logoutUser = async () => {
      try {
        const userToken = await KeyChain.getAccessToken();
        if (userToken && (await revokeLogin(userToken))) {
          dispatch({type: authenticationConstants.REMOVE_TOKEN});
        }
      } catch (error) {
        console.log('revoke failed');
      }
    };
    if (!isLoggedIn) {
      logoutUser();
    }
  }, [isLoggedIn]);

  const updateTokenAndScreen = async actionType => {
    try {
      const userToken = await KeyChain.getAccessToken();
      const isPending = await Helper.checkForPendingMasterDataDownload();
      if (userToken && isAccessTokenValid()) {
        dispatch({
          type: actionType,
          token: userToken,
          screen: isPending ? ROUTE_MASTER_DATA_DOWNLOAD : ROUTE_DASHBOARD,
        });
      }
    } catch (error) {
      console.log('retrieve failed');
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        setLoggedIn(true);
        updateTokenAndScreen(authenticationConstants.SIGN_IN);
      },
      signOut: () => {
        setLoggedIn(false);
        dispatch({type: authenticationConstants.SIGN_OUT});
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
                  name={authenticationConstants.LOGIN}
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
