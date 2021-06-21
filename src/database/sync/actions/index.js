import * as DBConstants from '../../constants';
import * as Schemas from '../../schemas';
import * as Helper from '../../helper';
import * as Operations from '../../operations';
import {NetworkService} from 'services';
import {Constants} from 'common';
import {getOnDemandSyncStatus} from 'utils/backgroundTask';

const syncDifference = 1; // minutes
/**
 * In this list we mention all the Schema's Name for which we want to run the Sync activity.
 */
const SYNC_TASK_LIST = [
  DBConstants.MASTER_TABLE_PARTY,         //partyMaster Table
  DBConstants.MASTER_MONTHLY_TABLE_PLAN,  //monthlyMaster Table
];


export const checkMinimumTimeConstraint = async () => {
  try{
    const record = await Operations.getRecord(
      Schemas.masterTablesDownLoadStatus,
      DBConstants.APPLICATION_SYNC_STATUS,
    );

    //Set the time constraints 
    let lastSyncRecordTime = new Date(record.lastSync);
    let constraintTime = new Date(lastSyncRecordTime);
    constraintTime.setMinutes(lastSyncRecordTime.getMinutes() + syncDifference);
    return constraintTime;
  }catch(err){
    console.log("checkMinimumTimeConstraint",err);
  }
}

/**
 * This method first check the time different between last sync and current time.
 * Secondly, it will call the runBackgrounTask() method as per the schemas mentioned in SYNC_TASK_LIST.
 * Thirdly, It will update the Master Table time for 'Application Sync' record for showing last sync Value.
 * @returns 
 */
export const syncTableTask = async () => {
  try {
    let resultArray = [];

    let constraintTime = await checkMinimumTimeConstraint();
    let currentTime = new Date();
    let onDemandSyncStatus = await getOnDemandSyncStatus();
    console.log("onDemand ",onDemandSyncStatus);
    console.log(constraintTime,"constraintTime",currentTime);
    if (onDemandSyncStatus == Constants.BACKGROUND_TASK.RUNNING || 
        (onDemandSyncStatus == Constants.BACKGROUND_TASK.NOT_RUNNING && constraintTime < currentTime)) { // if current time is greater than the lastSync time + syncDifference
      for (const table of SYNC_TASK_LIST) {
        await runBackgroundTask(table).then(result => {
          resultArray = [...resultArray, ...result]; //collecting result to show toastie
        });
      }
      await Operations.updateRecord(
        Schemas.masterTablesDownLoadStatus,
        DBConstants.downloadStatus.DOWNLOADED,
        DBConstants.APPLICATION_SYNC_STATUS,
      );
    }
    else{
      console.log('Sync Status',`Minimum ${syncDifference} minutes difference from Last Sync Time is required.`)
    }
    console.log("result arry ",[])
    return resultArray;
  } catch (err) {
    console.log('Error ', err);
  }
};

/**
 * Configuring param for POST api for different tables.
 * 
 * @param {*} item 
 * @param {*} staffPositionId 
 * @param {*} lastSync 
 * @param {*} data 
 * @returns 
 */
const configParam = (item, staffPositionId, lastSync, data) => {
  let postData = {};
  switch (item.name) {
    case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
      postData.staffPositionId = staffPositionId;
      postData.lastSyncTime = lastSync;
      postData[item.syncParam] = data;
      return postData;
    case DBConstants.MASTER_TABLE_PARTY:
      postData.staffPositionId = staffPositionId;
      postData.lastSyncTime = lastSync;
      postData[item.syncParam] = data;
      return postData;
  }
};

/**
 * This method will hit post data with configured postData.
 * @param {*} item 
 * @param {*} lastSync 
 * @param {*} data 
 * @returns 
 */
const syncPostRequest = async (item, lastSync, data ) => {
  const staffPositionId = await Helper.getStaffPositionId();
  let postData = configParam(
    item,
    staffPositionId,
    lastSync,
    data,
  );
  const response = await NetworkService.post(
    item.syncApiPath,
    postData,
  );
  return response;
}

/**
 * Get modified Records as per conditions from the schema
 * @param {*} schema 
 * @returns 
 */
const getModifiedRecords = async (schema) => {
  const tableRecord = await Operations.getAllRecord(schema);
  console.log("tableRecord length ",tableRecord.length);
  const modifiedRecords = await tableRecord.filtered(
    'syncParameters.isDeleted = true OR syncParameters.requireSync = true OR syncParameters.errorInSync = true',
  );
  console.log("modifiedRecords length ",modifiedRecords);
  return modifiedRecords;
}

/**
 * This method do three things :
 * 1. Check for modified Data.
 * 2. Hit Post API for sync with modified Data.
 * 3. Update Realm DB with response from POST data.
 * @returns true : success
 * @returns false: failure
 */
const runBackgroundTask = async tableName => {
  try {
    let resultArray = [];
    let item = await Helper.MASTER_TABLES_DETAILS.filter(obj => {
      return obj.name === tableName;
    });
    if (item[0].name === tableName) {
      const record = await Operations.getRecord(
        Schemas.masterTablesDownLoadStatus,
        item[0].name,
      );
      if (record?.status === DBConstants.downloadStatus.DOWNLOADED) {
        
        let modifiedRecords = await getModifiedRecords(item[0].schema[0]);
        // if(modifiedRecords == []){
        //   await Operations.updateRecord(
        //     Schemas.masterTablesDownLoadStatus,
        //     DBConstants.downloadStatus.DOWNLOADED,
        //     item[0].name,
        //   );
        //   return resultArray;
        // }
        //Hit Post API
        const response = await syncPostRequest(item[0], record.lastSync, Array.from(modifiedRecords));

        if (response?.status === DBConstants.HTTP_OK) {
          await Operations.commonSyncRecordCRUDMethod(
            item[0],
            response.data,
          ).then(res => {
            resultArray = [...resultArray, ...res];
            //console.log(`${item[0].name} result `, resultArray);
          });

          // const updatedRecord = await Operations.getAllRecord(
          //   item[0].schema[0],
          // );
          // console.log("UpdatedRecord length ",updatedRecord.length);

          await Operations.updateRecord(
            Schemas.masterTablesDownLoadStatus,
            DBConstants.downloadStatus.DOWNLOADED,
            item[0].name,
          );

          return resultArray;
        } else {
          console.log(`${item[0].name}'s response from API is ${response?.status}`);
          return resultArray;
        }
      } else {
        console.log(`${item[0].name} table status is still Pending`);
        return resultArray;
      }
    }
  } catch (error) {
    console.log('runBackgroundTask -- ', error);
    return false;
  }
};
