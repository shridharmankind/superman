import SyncAdapter from 'react-native-sync-adapter';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from 'common';
import {TASK_NAME} from 'utils/backgroundTask';

BackgroundFetch.setMinimumIntervalAsync(
  Constants.BACKGROUND_TASK.SYNC_INTERVAL,
); //This Background Fetch is used when app goes in background.

const syncInterval = Constants.BACKGROUND_TASK.SYNC_INTERVAL;
const syncFlexTime = Constants.BACKGROUND_TASK.SYNC_FLEX_TIME;

/**
 * This method is used to run the background task immediately e.g.: Button press.
 */
export const syncNow = () => {
  SyncAdapter.syncImmediately({
    syncInterval,
    syncFlexTime,
  });
};

/**
 * This method is used to run on the initial level.
 */
export const syncInit = () => {
  SyncAdapter.init({
    syncInterval,
    syncFlexTime,
  });
};

/**
 * This method will be used if we want to run background sync if app is in background.
 */
export const RegisterBackgroundTask = async () => {
  try {
    await AsyncStorage.setItem(
      Constants.BACKGROUND_TASK.TASK_NAME,
      Constants.BACKGROUND_TASK.NOT_RUNNING,
    );
    await AsyncStorage.setItem(
      Constants.BACKGROUND_TASK.ON_DEMAND_TASK_NAME,
      Constants.BACKGROUND_TASK.NOT_RUNNING,
    );
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 50, // seconds,
    });
  } catch (err) {
    console.log('RegisterBackgroundTask ', err);
  }
};
