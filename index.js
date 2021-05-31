import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import {runTask, TASK_NAME,setWorkingAsyncStorage,setExitAsyncStorage} from './src/utils/backgroundTask';
import AsyncStorage from '@react-native-community/async-storage';
const TASK_ID = 'TASK_SYNC_ADAPTER';
const TestTask = async () => {
    const getCurrentAsyncStorage = await AsyncStorage.getItem("BACKGROUND_TASK");
    console.log(" define Headless async Task - ",getCurrentAsyncStorage);
    if(getCurrentAsyncStorage === 'NOT_RUNNING'){
    await setWorkingAsyncStorage();
    await runTask();
    await setExitAsyncStorage();
    }
    else{
        console.log("Its already working");
    }
};
try {
    AppRegistry.cancelHeadlessTask(TASK_ID, TASK_ID);
  } catch (e) {}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerCancellableHeadlessTask(
    TASK_ID,
    () => TestTask,
    () => {},
  );
