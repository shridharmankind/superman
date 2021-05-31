import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
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
      console.log(" define Task async - ",getCurrentAsyncStorage);
      if(getCurrentAsyncStorage === 'NOT_RUNNING'){
        await setWorkingAsyncStorage();
              // fetch data here...
        const receivedNewData = "Simulated fetch " + Math.random()
        console.log("My task ", receivedNewData)
        await runTask();
        const newData =  receivedNewData
            ? BackgroundFetch.Result.NewData
            : BackgroundFetch.Result.NoData
        console.log("newData -- ",newData);
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
    const responseResult = await axios.get('https://api.github.com/users/mapbox')
    .then(async (response) => {
        await runTask1();
        console.log("Api fetched -- ");
        return response;
    });
    return responseResult;
}
export const runTask1 = async () => {
    const responseResult = await axios.get('https://api.github.com/users/mapbox')
    .then(async (response) => {
        for(let i=0;i<100;i++){
            await runTask2();
        }
        
        console.log("Api fetched1 -- ");
        return response;
    });
    return responseResult;
}
export const runTask2 = async () => {
    const responseResult = await axios.get('https://api.github.com/users/mapbox')
    .then(async (response) => {
        console.log("Api fetched2 -- ");
        return response;
    });
    return responseResult;
}