import 'react-native-gesture-handler';
import * as React from 'react';
import {Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import theme from 'themes';
import {
  ROUTE_COMPONENT_MAPPING,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
} from './navigations/routes';
import {useEffect} from 'react';

const Stack = createStackNavigator();

const App = () => {
  const isLoggedIn = true;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {Object.keys(ROUTE_COMPONENT_MAPPING).map(route => (
            <Stack.Screen
              key={route}
              name={route}
              component={ROUTE_COMPONENT_MAPPING[route]}
              options={{
                headerShown: false,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
