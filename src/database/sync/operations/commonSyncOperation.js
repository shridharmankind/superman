import {getSyncTaskList} from './../commonSyncMethods';
import * as DBConstants from '../../constants';
import * as Schemas from '../../schemas';
import * as Helper from '../../helper';
import * as Operations from '../../operations';

export const getAllConflictRecords = async () => {
  try {
    let modifiedRecordsList = [];
    let syncTaskList = getSyncTaskList();
    for (let [key, value] of syncTaskList) {
      await getConflictRecordsPerTable(key, value).then(
        modifiedTableRecords => {
          modifiedRecordsList = [
            ...modifiedRecordsList,
            ...modifiedTableRecords,
          ]; //collecting result to show toastie
        },
      );
    }
    return modifiedRecordsList;
  } catch (err) {
    console.log('getAllConflictRecords ', err);
  }
};

/**
 * This method do things :
 * 1. Check for modified Data.
 * @returns true : success
 * @returns false: failure
 */
const getConflictRecordsPerTable = async (tableName, value) => {
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
        let secondTableModifiedResult = await getChildTableModifiedRecords(
          item[0],
        );
        resultArray = [...modifiedRecords, ...secondTableModifiedResult];
      }
    }
    return resultArray;
  } catch (error) {
    console.log('runBackgroundTask -- ', error);
    return false;
  }
};

const getChildTableModifiedRecords = async item => {
  switch (item.name) {
    case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
      return getModifiedRecords(item.schema[1]);
    default:
      return [];
  }
};

/**
 * Get modified Records as per conditions from the schema
 * @param {*} schema
 * @returns
 */
const getModifiedRecords = async schema => {
  const tableRecord = await Operations.getAllRecord(schema);
  const modifiedRecords = await tableRecord.filtered(
    'syncParameters.errorInSync = true',
  );
  return modifiedRecords;
};
