import {Constants, getDBInstance} from 'database';
import {monthlyPlanOperations} from './index';

export const modifyDBObject = async (schema, object) => {
  return await getDBInstance().create(schema.name, object, 'modified');
};

export const getAllTableRecords = async schemaName => {
  return await getDBInstance().objects(schemaName);
};

export const getActiveUser = async () => {
  const users = await getDBInstance().objects(Constants.MASTER_TABLE_USER_INFO);
  return users[0] || {};
};

export const commonSyncRecordCRUDMethod = async (item, data) => {
  try {
    let resultArray = [];
    let schema = item.schema;
    await getDBInstance().write(() => {
      data.forEach(object => {
        let existingRecord = getDBInstance().objectForPrimaryKey(
          schema[0].name,
          object.id,
        );
        /**
         * Now, There can be two scenario's
         * 1. If record doesn't exist.
         * 2. If record exist.
         */
        //Case 1
        if (existingRecord == undefined || existingRecord == null) {
          //console.log('record not exist');
          recordNotExist(item, schema, existingRecord, object).then(result => {
            resultArray.push(result);
          });
        } else {
          //case 2
          //console.log('record exist');
          recordExist(item, schema, existingRecord, object).then(result => {
            resultArray.push(result);
          });
        }
      }); //data forEach ends here
    }); //getDbInstance write ends here
    return resultArray;
  } catch (err) {
    console.log('commonSyncRecordCRUDMethod', err);
  }
};

const recordExist = async (item, schema, existingRecord, object) => {
  try {
    let result = '';
    /**
     * Multiple Scenario will happen in this case.
     * case 2.1: SyncParameters are null
     * case 2.2: isDeleted = true and No errorInSync
     */
    if (object.syncParameters == null) {
      /**
       * This scenario will occur when records are successfully update in DB end.
       */
      object.syncParameters = existingRecord.syncParameters;
      if (object.syncParameters != null) {
        object.syncParameters.requireSync = false;
        object.syncParameters.lastModifiedOn = new Date();
        // result = Constants.SUCCESS;
      } else {
        result = Constants.FAILURE;
      }
    } //syncParameters are null
    else {
      //If syncParameters are not null then records are not successfully updated

      //check if isDelete is true and there is no errorInSync
      if (
        object.syncParameters.isDeleted &&
        !object.syncParameters.errorInSync
      ) {
        let deleteResult = deleteExistingRecord(schema[0], object.id);
        result = deleteResult;
        if (deleteResult == Constants.SUCCESS) {
          object = null;
        } else {
          result = Constants.FAILURE;
        }
      } //isDelete = true and errorInSync = false
      else {
        //This means there is some conflict in updating the records.
        object.syncParameters.requireSync = true;
        object.syncParameters.lastModifiedOn = new Date();
        result = Constants.CONFLICT;
      }
    } //else ends here
    if (object !== null && object.syncParameters != null) {
      switch (item.name) {
        case Constants.MASTER_MONTHLY_TABLE_PLAN:
          object.dailyPlannedActivities = [
            ...object.dailyPlannedActivities.map(dailyPlan => {
              if (dailyPlan.syncParameters != null) {
                return dailyPlan;
              }
              syncParametersObject.lastModifiedOn = new Date();
              let dailyObject = {
                ...dailyPlan,
                syncParameters: syncParametersObject,
              };
              getDBInstance().create(schema[1].name, dailyObject, 'modified');
              return dailyObject;
            }),
          ];
          getDBInstance().create(schema[0].name, object, 'modified');
          break;
        case Constants.MASTER_TABLE_PARTY:
          getDBInstance().create(schema[0].name, object, 'modified');
          break;
      }
      result = result == '' ? Constants.SUCCESS : result;
    }
    return result;
  } catch (err) {
    console.log('recordExist', err);
    return Constants.FAILURE;
  }
};

const recordNotExist = async (item, schema, existingRecord, object) => {
  try {
    if (existingRecord == undefined || existingRecord == null) {
      //Check if server sends its deleting confirmation on server DB side
      if (object.syncParameters != null && object.syncParameters.isDeleted) {
        return Constants.SUCCESS;
      }
      /**
       * If the respective record created on FE side then it must have devicePartyId in its
       * syncParameters object. We can find the record based on this devicePartyId field in our Db.
       * Two Scenarios can be identified here.
       * case 1.1: If record is create by FE then id is changed by server and sent back to us for updation.
       * case 1.2: Record is entirely new and we dont find any existing record.
       * case 1.3: Conflict state
       */
      if (
        object.syncParameters != null &&
        object.syncParameters.devicePartyId != ''
      ) {
        //case 1.1
        const existingFERecord = getDBInstance()
          .objects(schema[0].name)
          .filtered(
            `syncParameters.devicePartyId == "${object.syncParameters.devicePartyId}"`,
          );
        if (existingFERecord.length !== 0 && existingFERecord.length === 1) {
          const existingObjectId = existingFERecord[0].id;
          deleteExistingRecord(schema[0], existingObjectId);
          object.syncParameters.requireSync = false;
          getDBInstance().create(schema[0].name, object, 'modified');
          return Constants.SUCCESS;
        } else {
          //Conflict happened on both Side.
          return Constants.CONFLICT;
        }
      } else if (object.syncParameters == null) {
        //case 1.2
        //entirely new record
        switch (item.name) {
          case Constants.MASTER_MONTHLY_TABLE_PLAN:
            return monthlyPlanOperations(getDBInstance()).createSingleRecord(
              schema,
              object,
            );
          case Constants.MASTER_TABLE_PARTY:
            return createSinglePartyMasterRecord(schema, object);
        }
        //return Constants.SUCCESS;
      } else {
        //case 1.3
        // This scenario is conflict state when syncParameters are not null but devicePartyId = null
        return Constants.CONFLICT;
      }
    } // if condition end here for existingRecord reference check
  } catch (err) {
    console.log('recordNotExist', err);
    return Constants.FAILURE;
  }
};

export const deleteDBObject = object => {
  try {
    if (object != undefined) {
      getDBInstance().delete(object);
      object = null;
      return Constants.SUCCESS;
    }
    return Constants.FAILURE;
  } catch (err) {
    console.log('deleteDBObject', err);
    return Constants.FAILURE;
  }
};

export const deleteExistingRecord = (schema, id) => {
  try {
    let newData = getDBInstance().objects(schema.name).filtered(`id == ${id}`);
    if (newData != undefined) {
      getDBInstance().delete(newData[0]);
      newData = null;
      return Constants.SUCCESS;
    }
    return Constants.FAILURE;
  } catch (err) {
    console.log('deleteExistingRecord -', err);
    return Constants.FAILURE;
  }
};

export const createSinglePartyMasterRecord = async (schema, object,dbInstance = null) => {
  try {
    let specialization,
      area,
      qualification,
      partyTypes,
      partyTypeGroup,
      engagement;
    partyTypeGroup = getDBInstance().create(
      schema[4].name,
      object.partyTypes?.partyTypeGroup,
      'modified',
    );
    partyTypes = getDBInstance().create(
      schema[5].name,
      {...object.partyTypes, ...partyTypeGroup},
      'modified',
    );

    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    let syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: false,
      lastModifiedOn: new Date(),
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };

    let partyMaster = getDBInstance().create(
      schema[0].name,
      {
        id: object.id,
        shortName: object.shortName,
        name: object.name,
        qualification: object.qualification,
        frequency: object.frequency,
        category: object.category,
        potential: object.potential,
        isKyc: object.isKyc,
        syncParameters:
          object.syncParameters != null
            ? object.syncParameters
            : syncParametersObject,
        partyTypes: partyTypes,
        alreadyVisited: object.alreadyVisited,
        birthday: object.birthday,
        anniversary: object.anniversary,
        selfDispensing: object.selfDispensing,
        partyTypeId: object.partyTypeId,
      },
      'modified',
    );
    object.specialities?.forEach(obj => {
      specialization = getDBInstance().create(schema[1].name, obj, 'modified');
      partyMaster.specialities.push(specialization);
    });
    object.areas?.forEach(obj => {
      area = getDBInstance().create(schema[2].name, obj, 'modified');
      partyMaster.areas.push(area);
    });
    object.qualifications?.forEach(obj => {
      qualification = getDBInstance().create(schema[3].name, obj, 'modified');
      partyMaster.qualifications.push(qualification);
    });
    object.engagement?.forEach(obj => {
      engagement = getDBInstance().create(schema[4].name, obj, 'modified');
      partyMaster.engagement.push(engagement);
    });
    return Constants.SUCCESS;
  } catch (err) {
    console.log('createSinglePartyMasterRecord ', err);
    return Constants.FAILURE;
  }
};

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

let syncErrorDetailsObject = {
  conflictType: 'null',
  errorMessage: 'null',
};
export const syncParametersObject = {
  devicePartyId: null,
  isActive: true,
  requireSync: true,
  lastModifiedOn: new Date(),
  isDeleted: false,
  errorInSync: false,
  syncErrorDetails: syncErrorDetailsObject,
};
