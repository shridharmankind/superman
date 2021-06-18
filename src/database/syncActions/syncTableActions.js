import * as Constants from '../constants';
import * as Schemas from '../schemas';
import * as Helper from '../helper';
import * as Operations from '../operations';
import {commonSyncRecordCRUDMethod} from '../operations/common';
import {NetworkService} from 'services';

const downloadStatus = Object.freeze({
  DOWNLOADED: 'DOWNLOADED',
  PENDING: 'PENDING',
});

const SYNC_TASK_LIST = [
  Constants.MASTER_TABLE_PARTY,
  Constants.MASTER_MONTHLY_TABLE_PLAN,
];

export const syncTableTask = async () => {
  try {
    let resultArray = [];
    for (const table of SYNC_TASK_LIST) {
      await runBackgroundTask(table).then(result => {
        console.log('syncTableTask result ', result);
        resultArray = [...resultArray, ...result];
      });
    }
    console.log('table name 1');
    await Operations.updateRecord(
      Schemas.masterTablesDownLoadStatus,
      Constants.downloadStatus.DOWNLOADED,
      Constants.APPLICATION_SYNC_STATUS,
    );
    console.log('table name 2');
    return resultArray;
  } catch (err) {
    console.log('Error ', err);
  }
};

const configParam = (item, staffPositionId, lastSync, data) => {
  let postData = {};
  switch (item.name) {
    case Constants.MASTER_MONTHLY_TABLE_PLAN:
      postData.staffPositionId = 2;
      postData.lastSyncTime = lastSync;
      postData[item.syncParam] = data;
      return postData;
    case Constants.MASTER_TABLE_PARTY:
      postData.staffPositionId = staffPositionId;
      postData.lastSyncTime = lastSync;
      postData[item.syncParam] = data;
      return postData;
  }
};

/**
 *
 * @returns true : success
 * @returns false: failure
 */
const runBackgroundTask = async tableName => {
  try {
    let resultArray = [];
    console.log('start table Name ', tableName);
    let item = await Helper.MASTER_TABLES_DETAILS.filter(obj => {
      return obj.name === tableName;
    });
    console.log(item);
    if (item[0].name === tableName) {
      const record = await Operations.getRecord(
        Schemas.masterTablesDownLoadStatus,
        item[0].name,
      );
      if (record?.status === downloadStatus.DOWNLOADED) {
        const tableRecord = await Operations.getAllRecord(item[0].schema[0]);
        //console.log("tablerecord ",JSON.stringify(tableRecord,null,2));
        const modifiedData = tableRecord.filtered(
          'syncParameters.isDeleted = true OR syncParameters.requireSync = true OR syncParameters.errorInSync = true',
        );
        //modifiedData[1].id == 13 ? modifiedData[1].syncParameters.isDeleted = true : '';
        //console.log("modified -- ",JSON.stringify(modifiedData,null,2));
        const staffPositionId = await Helper.getStaffPositionId();
        let postData = configParam(
          item[0],
          staffPositionId,
          record.lastSync,
          Array.from(modifiedData),
        );
        //console.log("postData - ",postData);
        const response = await NetworkService.post(
          item[0].syncApiPath,
          postData,
        );
        console.log('response--- ', JSON.stringify(response, null, 2));
        if (response?.status === Constants.HTTP_OK) {
          await commonSyncRecordCRUDMethod(item[0], response.data).then(res => {
            resultArray = [...resultArray, ...res];
            console.log('commonSyncRecordCRUDMethod ', resultArray);
          });
          const updatedRecord = await Operations.getAllRecord(
            item[0].schema[0],
          );
          console.log('Iupdated == ', JSON.stringify(updatedRecord, null, 2));

          await Operations.updateRecord(
            Schemas.masterTablesDownLoadStatus,
            downloadStatus.DOWNLOADED,
            item[0].name,
          );

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
