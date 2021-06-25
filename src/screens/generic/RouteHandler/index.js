import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {authenticationConstants} from './constants';
import {Login} from 'screens/generic';
import ROUTES from '../../../navigations/routes';
import {authTokenActions} from './redux';
import {authSelector} from './redux/routeHandlerSelector';
import {useSelector, useDispatch} from 'react-redux';
import {KeyChain} from 'helper';
import {revokeLogin, isAccessTokenValid} from '../../../utils/util';

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
        const token = await KeyChain.getAccessToken();
        if (token && (await isAccessTokenValid())) {
          dispatch(
            authTokenActions.signIn({
              userToken: token,
            }),
          );
        }
      } catch (error) {}
    };
    updateTokenAndScreen();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen}>
        {!userToken ? (
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
  );
}
