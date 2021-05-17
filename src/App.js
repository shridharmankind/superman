import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {Schedule} from 'screens/tourPlan';
// import {Settings} from 'screens/generic';

import {Header} from 'components/elements';
import theme from 'themes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Schedule"
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
