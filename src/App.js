import 'react-native-gesture-handler';
import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {Login, Home} from 'screens/generic';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
