import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-community/async-storage';
import {Sync} from 'database';
import {KeyChain} from 'helper';
import {showToast, hideToast} from '../../components/widgets/Toast';

export const TASK_NAME = 'BACKGROUND_TASK';
export const syncInterval = 60; // 2 minute
export const syncFlexTime = 15; // 2 minutes

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CONFLICT = 'CONFLICT';

export const setWorkingAsyncStorage = async () => {
  const getAsyncValue = await AsyncStorage.getItem('BACKGROUND_TASK');
  if (getAsyncValue === 'NOT_RUNNING') {
    await AsyncStorage.setItem('BACKGROUND_TASK', 'RUNNING');
  }
};

export const setExitAsyncStorage = async () => {
  const getAsyncValue = await AsyncStorage.getItem('BACKGROUND_TASK');
  if (getAsyncValue === 'RUNNING') {
    await AsyncStorage.setItem('BACKGROUND_TASK', 'NOT_RUNNING');
  }
};

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const accessToken = await KeyChain.getAccessToken();
    const getCurrentAsyncStorage = await AsyncStorage.getItem(
      'BACKGROUND_TASK',
    );
    if (accessToken && getCurrentAsyncStorage === 'NOT_RUNNING') {
      console.log('[SYNC ACTIVITY] STARTED');
      await setWorkingAsyncStorage();
      console.log('[BACKGROUND_TASK] :  ', getCurrentAsyncStorage);
      await runTask();
      await setExitAsyncStorage();
      console.log('[BACKGROUND_TASK] :  ', getCurrentAsyncStorage);
    } else {
      console.log('[BACKGROUND_TASK] : NOT_STARTED');
    }
  } catch (err) {
    console.log('err -- ', err);
    return BackgroundFetch.Result.Failed;
  }
});

export const TestTask = async () => {
  try {
    console.log("again called");
    const accessToken = await KeyChain.getAccessToken();
    const getCurrentAsyncStorage = await AsyncStorage.getItem(
      'BACKGROUND_TASK',
    );
    if (accessToken && getCurrentAsyncStorage === 'NOT_RUNNING') {
      console.log('[SYNC ACTIVITY] STARTED');
      await setWorkingAsyncStorage();
      console.log('[FOREGROUND_TASK] ', getCurrentAsyncStorage);
      await runTask();
      await setExitAsyncStorage();
    } else {
      console.log('[FOREGROUND_TASK] : NOT_STARTED');
    }
  } catch (err) {
    console.log('err -- ', err);
  }
};

const showToastie = (tostieType, message) => {
  showToast({
    type: tostieType,
    autoHide: true,
    props: {
      onPress: () => {
        hideToast();
      },
      onClose: () => hideToast(),
      heading: 'Sync Activity',
      subHeading: message,
    },
  });
};

export const runTask = async () => {
  try {
    let resultArray = [];
    await Sync.SyncAction.syncTableTask().then(result => {
      console.log('final Result ', result);
      resultArray = result;
    });
    console.log('resultArray ', resultArray);
    if(resultArray == undefined){
      return;
    }
    if (resultArray.includes(CONFLICT)) {
      showToastie('warning', 'Sync Activity have conflicts');
    } else if (resultArray.includes(FAILURE)) {
      showToastie('warning', 'Sync Activity Failed');
    } else {
      showToastie('success', 'Sync Activity Completed');
    }
  } catch (err) {
    console.log(err);
    showToastie('warning', 'Sync Activity Failed');
  }
};
