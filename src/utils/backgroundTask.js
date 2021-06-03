import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager";
import AsyncStorage from '@react-native-community/async-storage';
import {fetchPreviouslyUpdatedData } from './../database/realmTransactions/partyTableTransaction';
import {KeyChain} from 'helper';


export const TASK_NAME = "BACKGROUND_TASK";
export const syncInterval = 60; // 1 minute
export const syncFlexTime = 15; // 15 seconds

export const setWorkingAsyncStorage = async () => {
    const getAsyncValue = await AsyncStorage.getItem("BACKGROUND_TASK");
    if(getAsyncValue === 'NOT_RUNNING'){
        await AsyncStorage.setItem("BACKGROUND_TASK","RUNNING");
    }
    
}

export const setExitAsyncStorage = async () => {
    const getAsyncValue = await AsyncStorage.getItem("BACKGROUND_TASK");
    if(getAsyncValue === 'RUNNING'){
        await AsyncStorage.setItem("BACKGROUND_TASK","NOT_RUNNING");
    }
    
}

TaskManager.defineTask(TASK_NAME, async () => {
    try {
      const accessToken = await KeyChain.getAccessToken();  
      const getCurrentAsyncStorage = await AsyncStorage.getItem("BACKGROUND_TASK");
      console.log("[SYNC ACTIVITY] STARTED");
      console.log("[BACKGROUND_TASK] :  ",getCurrentAsyncStorage);
      if(accessToken && getCurrentAsyncStorage === 'NOT_RUNNING'){
        await setWorkingAsyncStorage();
        await runTask();
        await setExitAsyncStorage();
      }
      else{
          console.log("[BACKGROUND_TASK] : ANOTHER_TASK_IS_RUNNING");
      }
    } catch (err) {
      console.log("err -- ",err);
      return BackgroundFetch.Result.Failed
    }
});

export const TestTask = async () => {
    const accessToken = await KeyChain.getAccessToken();
    const getCurrentAsyncStorage = await AsyncStorage.getItem("BACKGROUND_TASK");
    console.log("[FOREGROUND_TASK] ",getCurrentAsyncStorage);
    if(accessToken && getCurrentAsyncStorage === 'NOT_RUNNING'){
      await setWorkingAsyncStorage();
      await runTask();
      await setExitAsyncStorage();
    }
    else{
      console.log("[FOREGROUND_TASK] : WILL_NOT_WORK");
    }
};



export const runTask = async () => {
    await fetchPreviouslyUpdatedData();
    console.log("[SYNC ACTIVITY] COMPLETED");
}

