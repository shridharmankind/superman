import 'react-native-gesture-handler';
import * as React from 'react';
import Login from './screens/generic/Login';
import {Header} from './components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: props => <Header title="Welcome!" {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
