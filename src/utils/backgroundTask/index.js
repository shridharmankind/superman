import * as BackgroundFetch from 'expo-background-fetch'; //Task when App is in background
import * as TaskManager from 'expo-task-manager'; //Task Manager for defining task when app is in background
import AsyncStorage from '@react-native-community/async-storage';
import {Sync} from 'database';
import {KeyChain} from 'helper';
import {Strings, Constants} from 'common';
import {showToast, hideToast} from 'components/widgets/Toast';
import NetInfo from '@react-native-community/netinfo';
import {store} from '../../App';
import {fetchStatusSliceActions} from 'reducers';

export const TASK_NAME = 'BACKGROUND_TASK';

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CONFLICT = 'CONFLICT';

export const setOnDemandSyncStatusRunning = async () => {
  const getAsyncValue = await AsyncStorage.setItem(
    Constants.BACKGROUND_TASK.ON_DEMAND_TASK_NAME,
    Constants.BACKGROUND_TASK.RUNNING,
  );
  return getAsyncValue;
};

export const setOnDemandSyncStatusNotRunning = async () => {
  const getAsyncValue = await AsyncStorage.setItem(
    Constants.BACKGROUND_TASK.ON_DEMAND_TASK_NAME,
    Constants.BACKGROUND_TASK.NOT_RUNNING,
  );
  return getAsyncValue;
};

export const getOnDemandSyncStatus = async () => {
  const getAsyncValue = await AsyncStorage.getItem(
    Constants.BACKGROUND_TASK.ON_DEMAND_TASK_NAME,
  );
  return getAsyncValue;
};

export const getBackgrounTaskValue = async () => {
  const getAsyncValue = await AsyncStorage.getItem(
    Constants.BACKGROUND_TASK.TASK_NAME,
  );
  return getAsyncValue;
};

/**
 * Set BACKGROUND_TASK value to RUNNING
 */
export const setRunningBackgroundTaskValue = async () => {
  const getAsyncValue = await AsyncStorage.getItem(
    Constants.BACKGROUND_TASK.TASK_NAME,
  );
  if (getAsyncValue === Constants.BACKGROUND_TASK.NOT_RUNNING) {
    await AsyncStorage.setItem(
      Constants.BACKGROUND_TASK.TASK_NAME,
      Constants.BACKGROUND_TASK.RUNNING,
    );
    return Constants.BACKGROUND_TASK.RUNNING;
  }
};

/**
 * Set BACKGROUND_TASK value to NOT_RUNNING
 */
export const setNotRunningBackgroundTaskValue = async () => {
  const getAsyncValue = await AsyncStorage.getItem(
    Constants.BACKGROUND_TASK.TASK_NAME,
  );
  if (getAsyncValue === Constants.BACKGROUND_TASK.RUNNING) {
    await AsyncStorage.setItem(
      Constants.BACKGROUND_TASK.TASK_NAME,
      Constants.BACKGROUND_TASK.NOT_RUNNING,
    );
    return Constants.BACKGROUND_TASK.NOT_RUNNING;
  }
  return getAsyncValue;
};

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
    await NetInfo.fetch().then(async state => {
      let getCurrentBackgrounStatus = await AsyncStorage.getItem(
        Constants.BACKGROUND_TASK.TASK_NAME,
      );
      if (
        state.isConnected &&
        getCurrentBackgrounStatus === Constants.BACKGROUND_TASK.NOT_RUNNING
      ) {
        //check for internet connection and background Status if it is not running
        const accessToken = await KeyChain.getAccessToken();
        let getCurrentAsyncStorage = await AsyncStorage.getItem(
          Constants.BACKGROUND_TASK.TASK_NAME,
        );
        if (
          accessToken &&
          getCurrentAsyncStorage === Constants.BACKGROUND_TASK.NOT_RUNNING
        ) {
          console.log(
            ` [${Constants.BACKGROUND_TASK.TASK_NAME}] STARTED ${Constants.BACKGROUND_TASK.RUNNING}`,
          );
          getCurrentAsyncStorage = await setRunningBackgroundTaskValue();
          console.log(
            `[${Constants.BACKGROUND_TASK.TASK_NAME}] STATUS:  `,
            getCurrentAsyncStorage,
          );
          store.dispatch(fetchStatusSliceActions.setSyncCompletionStatus(''));
          store.dispatch(
            fetchStatusSliceActions.setSyncStatus(getCurrentAsyncStorage),
          );
          await runBackgroundTask();
          getCurrentAsyncStorage = await setNotRunningBackgroundTaskValue();
          console.log(
            `[${Constants.BACKGROUND_TASK.TASK_NAME}] STATUS:  `,
            getCurrentAsyncStorage,
          );
          store.dispatch(
            fetchStatusSliceActions.setSyncStatus(getCurrentAsyncStorage),
          );
          console.log(` [${Constants.BACKGROUND_TASK.TASK_NAME}] EXIT`);
        } else {
          //showToastie('warning', ALREADY_RUNNING_MESSAGE);
          console.log('Already running Sync');
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
export const showToastie = (toastieType, message) => {
  showToast({
    type: toastieType,
    autoHide: true,
    props: {
      onPress: () => {
        hideToast();
      },
      onClose: () => hideToast(),
      heading: message,
    },
  });
};

export const showToastieWithButton = (toastieType, message) => {
  showToast({
    type: toastieType,
    autoHide: false,
    props: {
      onPress: () => {
        hideToast();
      },
      onPressLeftBtn: () => {
        hideToast();
      },
      onClose: () => hideToast(),
      heading: message,
      actionLeftTitle: Strings.backgroundTask.toastBtns.viewSummary,
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
    let finalSyncResult = '';
    await Sync.SyncAction.syncTableTask().then(result => {
      resultArray = result || [];
    });
    let isDemandSync = await getOnDemandSyncStatus();
    if (
      resultArray.length === 0 &&
      isDemandSync === Constants.BACKGROUND_TASK.RUNNING
    ) {
      finalSyncResult = 'Successfull Sync';
      showToastie(
        Constants.TOAST_TYPES.SUCCESS,
        Strings.backgroundTask.toastBtns.successMessage,
      );
    }
    if (resultArray && resultArray.includes(CONFLICT)) {
      finalSyncResult = 'Completed Sync with Conflict';
      showToastieWithButton(
        Constants.TOAST_TYPES.WARNING,
        Strings.backgroundTask.toastBtns.conflictMessage,
      );
    } else if (resultArray && resultArray.includes(FAILURE)) {
      finalSyncResult = 'Failure in Sync';
      showToastieWithButton(
        Constants.TOAST_TYPES.ALERT,
        Strings.backgroundTask.toastBtns.failureMessage,
      );
    } else if (
      resultArray &&
      resultArray.includes(SUCCESS) &&
      isDemandSync === Constants.BACKGROUND_TASK.RUNNING
    ) {
      finalSyncResult = 'Successfull Sync';
      showToastie(
        Constants.TOAST_TYPES.SUCCESS,
        Strings.backgroundTask.toastBtns.successMessage,
      );
    }
    store.dispatch(
      fetchStatusSliceActions.setSyncCompletionStatus(finalSyncResult),
    );
    if (isDemandSync === Constants.BACKGROUND_TASK.RUNNING) {
      await setOnDemandSyncStatusNotRunning();
    }
  } catch (err) {
    console.log(err);
  }
};
