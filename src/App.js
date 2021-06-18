import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox,  Alert} from 'react-native';

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
import {setI18nConfig} from './locale';
import {Toast} from 'components/widgets';
import SyncAdapter from 'react-native-sync-adapter';
import {TASK_NAME,syncFlexTime,syncInterval} from './utils/backgroundTask';
import * as BackgroundFetch from "expo-background-fetch";
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

BackgroundFetch.setMinimumIntervalAsync(60);


const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  LogBox.ignoreAllLogs();
  const isLoggedIn = false;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;
  const [conn,setConn] = React.useState(false);
  setI18nConfig();
  useEffect(() => {
    //const unsubscribe = checkNetworkConnectivity();
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
      
      syncBackgroundTaskOnStart();
      RegisterBackgroundTask();
    }

    return () => {
      console.log("Unmount task in working");
      //unsubscribe();
      AsyncStorage.removeItem("BACKGROUND_TASK");
    }
  
  }, []);

  const checkNetworkConnectivity = () => {
    try{
        const netSubscribe = NetInfo.addEventListener(state => {
          console.log("EventListerner Connection type", state.type);
          console.log("EventListerner Is connected?", state.isConnected);
          //setConn(state.isConnected);
        });

        return netSubscribe;
      
    } catch(err){
        console.log("Network Connectivity Error ",err);
    }
  }

  const syncBackgroundTaskOnStart = () => {
    console.log("App.js")
    SyncAdapter.init({
      syncInterval,
      syncFlexTime,
    });
  }

  const RegisterBackgroundTask = async () => {
    try {
      await AsyncStorage.setItem("BACKGROUND_TASK","NOT_RUNNING");
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 10000, // seconds,
      })
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
