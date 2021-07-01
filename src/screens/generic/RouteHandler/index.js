import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {authenticationConstants} from './constants';
import {MasterDataDownload, Login} from 'screens/generic';
import {linking} from 'navigations';
import ROUTES, {
  ROUTE_MASTER_DATA_DOWNLOAD,
  ROUTE_DASHBOARD,
} from '../../../navigations/routes';
import {authTokenActions} from './redux';
import {authSelector} from './redux/routeHandlerSelector';
import {useSelector, useDispatch} from 'react-redux';
import {KeyChain} from 'helper';
import {revokeLogin, isAccessTokenValid} from '../../../utils/util';
import {Helper} from 'database';
import Auth from '../Auth';

const Stack = createStackNavigator();
export default function RouteHandler() {
  const dispatch = useDispatch();
  const screen = useSelector(authSelector.getAuthScreen());
  const userToken = useSelector(authSelector.getAuthToken());
  const isUserLoggedOut = useSelector(authSelector.getAuthLogoutStatus());

  React.useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = await KeyChain.getAccessToken();
        if (token) {
          await revokeLogin(token);
          dispatch(authTokenActions.removeToken());
        }
      } catch (error) {}
    };
    if (isUserLoggedOut) {
      logoutUser();
    }
  }, [dispatch, isUserLoggedOut]);

  React.useEffect(() => {
    const updateTokenAndScreen = async () => {
      try {
        const isPending = await Helper.checkForPendingMasterDataDownload();
        const token = await KeyChain.getAccessToken();
        if (token && (await isAccessTokenValid())) {
          dispatch(
            authTokenActions.signIn({
              userToken: token,
              screen: isPending ? ROUTE_MASTER_DATA_DOWNLOAD : ROUTE_DASHBOARD,
            }),
          );
        }
      } catch (error) {}
    };
    updateTokenAndScreen();
  }, [dispatch]);

  const renderLoggedComponent = () => {
    if (screen === ROUTE_DASHBOARD) {
      return ROUTES.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false,
          }}
        />
      ));
    } else {
      return (
        <Stack.Screen
          name={ROUTE_MASTER_DATA_DOWNLOAD}
          component={MasterDataDownload}
          options={{
            headerShown: false,
          }}
        />
      );
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!userToken || screen === authenticationConstants.LOGIN ? (
          <>
            <Stack.Screen
              name={authenticationConstants.LOGIN}
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={authenticationConstants.AUTH}
              component={Auth}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          renderLoggedComponent()
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
