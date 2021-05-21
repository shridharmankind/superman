import 'react-native-gesture-handler';
import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Login} from 'screens/generic';
import {Schedule} from 'screens/tourPlan';
import {Header} from 'components/elements';
import theme from 'themes';
import {useEffect} from 'react';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Schedule}
            options={{
              headerTitle: props => <Header title="Welcome!" {...props} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
