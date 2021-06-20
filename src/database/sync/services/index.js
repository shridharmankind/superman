import SyncAdapter from 'react-native-sync-adapter';
import NetInfo from '@react-native-community/netinfo';
import {TASK_NAME, NOT_RUNNING} from 'utils/backgroundTask';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-community/async-storage';

let syncFlexTime = 120; //seconds    //The amount of flex time in seconds before syncInterval that you permit for the sync to take place. Must be less than syncInterval
let syncInterval = 300; //seconds   //The amount of time in seconds that you wish to elapse between periodic syncs

BackgroundFetch.setMinimumIntervalAsync(300); //This Background Fetch is used when app goes in background.

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
    await AsyncStorage.setItem(TASK_NAME, NOT_RUNNING);
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 120, // seconds,
    });
  } catch (err) {
    console.log('RegisterBackgroundTask ', err);
  }
};
