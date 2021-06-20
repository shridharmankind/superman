import * as BackgroundFetch from 'expo-background-fetch'; //Task when App is in background
import * as TaskManager from 'expo-task-manager'; //Task Manager for defining task when app is in background
import AsyncStorage from '@react-native-community/async-storage';
import {Sync} from 'database';
import {KeyChain} from 'helper';
import {showToast, hideToast} from '../../components/widgets/Toast';
import NetInfo from '@react-native-community/netinfo';

export const TASK_NAME = 'BACKGROUND_TASK'; //Task Name for running background task
export const NOT_RUNNING = 'NOT_RUNNING';
export const RUNNING = 'RUNNING';

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CONFLICT = 'CONFLICT';

/**
 * Set BACKGROUND_TASK value to RUNNING
 */
export const setRunningBackgrounTaskValue = async () => {
  const getAsyncValue = await AsyncStorage.getItem(TASK_NAME);
  if (getAsyncValue === NOT_RUNNING) {
    await AsyncStorage.setItem(TASK_NAME, RUNNING);
    return RUNNING;
  }
};

/**
 * Set BACKGROUND_TASK value to NOT_RUNNING
 */
export const setNotRunningBackgrounTaskValue= async () => {
  const getAsyncValue = await AsyncStorage.getItem(TASK_NAME);
  if (getAsyncValue === RUNNING) {
    await AsyncStorage.setItem(TASK_NAME, NOT_RUNNING);
    return NOT_RUNNING;
  }
}

/**
 * Set Task when app is in Background
 */
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    await setBackgroundTask();
  } catch (err) {
    console.log('err ', err);
    return BackgroundFetch.Result.Failed;
  }
});

/**
 * Register Background Task when App is in foreground.
 */
export const registerBackgroundTask = async () => {
  try {
    await setBackgroundTask();
  } catch (err) {
    console.log('TestTask ', err);
  }
};

/**
 * Set Background Task which will run based on its AsyncStorage value, 
 * So that no two simultaneously sync activity can run at the same time.
 */
const setBackgroundTask = async () => {
  try {
    await NetInfo.fetch().then( async (state) => {
      if (state.isConnected) {
        const accessToken = await KeyChain.getAccessToken();
        let getCurrentAsyncStorage = await AsyncStorage.getItem(TASK_NAME);
        if (accessToken && getCurrentAsyncStorage === NOT_RUNNING) {
          console.log(` [${TASK_NAME}] STARTED ${RUNNING}`);
          getCurrentAsyncStorage = await setRunningBackgrounTaskValue();
          console.log(`[${TASK_NAME}] STATUS:  `, getCurrentAsyncStorage);
          await runBackgroundTask();
          getCurrentAsyncStorage = await setNotRunningBackgrounTaskValue();
          console.log(`[${TASK_NAME}] STATUS:  `, getCurrentAsyncStorage);
          console.log(` [${TASK_NAME}] EXIT`);
        }
      } else {
        console.log('Not connected work');
      }
    });
  } catch (err) {
    console.log('err -- ', err);
  }
};

/**
 * 
 * @param {Type of the toastie} tostieType 
 * @param {Message} message 
 */
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

/**
 * This methos will run the syncTable task for all table which needs be sync in background.
 * It also collects the overall status of the sync and show toastie as per the status.
 * @returns
 */
export const runBackgroundTask = async () => {
  try {
    let resultArray = [];
    await Sync.SyncAction.syncTableTask().then(result => {
      resultArray = result || [];
    });
    console.log('Overall result ', resultArray);
    if (resultArray && resultArray.includes(CONFLICT)) {
      showToastie('warning', 'Sync Activity have conflicts');
    } else if (resultArray && resultArray.includes(FAILURE)) {
      showToastie('alert', 'Sync Activity Failed');
    } else if (resultArray && resultArray.includes(SUCCESS)) {
      showToastie('success', 'Sync Activity Completed');
    }
  } catch (err) {
    console.log(err);
    showToastie('alert', 'Sync Activity Failed');
  }
};
