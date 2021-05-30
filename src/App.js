import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {ROUTE_DASHBOARD, ROUTE_LOGIN} from './navigations/routes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {Toast} from 'components/widgets';

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

const TASK_NAME = "BACKGROUND_TASK"
BackgroundFetch.setMinimumIntervalAsync(60);
TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + Math.random()
    console.log("My task ", receivedNewData)
    const newData =  receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
    console.log("newData -- ",newData);
    return newData;  
  } catch (err) {
    console.log("err -- ",err);
    return BackgroundFetch.Result.Failed
  }
})

const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  LogBox.ignoreAllLogs();
  const isLoggedIn = true;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;

  useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
      RegisterBackgroundTask();
    }
  }, []);

  const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 5, // seconds,
      })
      console.log("Task registered")
    } catch (err) {
      console.log("Task Register failed:", err)
    }
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            {ROUTES.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  headerShown: false,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;
