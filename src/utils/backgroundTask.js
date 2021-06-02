import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import {fetchPreviouslyUpdatedData } from './../database/realmTransactions/partyTableTransaction';
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
      const getCurrentAsyncStorage = await AsyncStorage.getItem("BACKGROUND_TASK");
      console.log("[BACKGROUND_TASK] :  ",getCurrentAsyncStorage);
      if(getCurrentAsyncStorage === 'NOT_RUNNING'){
        await setWorkingAsyncStorage();
              // fetch data here...
        const receivedNewData = "Simulated fetch " + Math.random()
        console.log("[BACKGROUND_TASK] : Timing ", receivedNewData)
        await runTask();
        const newData =  receivedNewData
            ? BackgroundFetch.Result.NewData
            : BackgroundFetch.Result.NoData
        await setExitAsyncStorage();
      }
      else{
          console.log("Its already working");
      }
    } catch (err) {
      console.log("err -- ",err);
      return BackgroundFetch.Result.Failed
    }
})



export const runTask = async () => {
    // const responseResult = await axios.get('https://api.github.com/users/mapbox')
    // .then(async (response) => {
    //     console.log("First API Successfully Fetched ");
    //     return response;
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    // return responseResult;
    console.log("RUn task running");
    return await fetchPreviouslyUpdatedData();
}

