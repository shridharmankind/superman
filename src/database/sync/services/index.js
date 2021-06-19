import SyncAdapter from 'react-native-sync-adapter';
//import {syncFlexTime, syncInterval} from 'utils/backgroundTask';
let syncFlexTime = 15;
let syncInterval = 60;
export const syncNow = () => {
  SyncAdapter.syncImmediately({
    syncInterval,
    syncFlexTime,
  });
};

export const syncInit = () => {
  console.log("calledd");
  SyncAdapter.init({
    syncInterval,
    syncFlexTime,
  });
};
