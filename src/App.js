import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import theme from 'themes';
import {
  ROUTE_COMPONENT_MAPPING,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
} from './navigations/routes';

const Stack = createStackNavigator();

const App = () => {
  const isLoggedIn = true;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;

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
