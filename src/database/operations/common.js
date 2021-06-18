import {Constants, getDBInstance} from 'database';
import {monthlyPlanOperations} from './index';

export const getAllTableRecords = async schemaName => {
  return await getDBInstance().objects(schemaName);
};

export const getActiveUser = async () => {
  const users = await getDBInstance().objects(Constants.MASTER_TABLE_USER_INFO);
  return users[0] || {};
}

export const commonSyncRecordCRUDMethod = async (item, data) => {
  try{
    console.log("Running for item",item);
    let resultArray = [];
    let schema = item.schema;
    await getDBInstance().write(() => {
      data.forEach((object) => {
        let existingRecord = getDBInstance().objectForPrimaryKey(schema[0].name, object.id);
        console.log("Existing Record - ",existingRecord);
        console.log("Record From Server - ",object);
        /**
         * Now, There can be two scenario's
         * 1. If record doesn't exist.
         * 2. If record exist.
         */
        //Case 1
        if(existingRecord == undefined || existingRecord == null){
          console.log("record not exist");
          recordNotExist(item,schema, existingRecord, object)
          .then((result) => {
            resultArray.push(result);
          });
        }
        else{ //case 2
          console.log("record exist");
          recordExist(item,schema, existingRecord, object)
          .then((result) => {
            resultArray.push(result);
          })
        }
        console.log("End of one Object");
      });//data forEach ends here
    }); //getDbInstance write ends here
    return resultArray;
  }
  catch(err){
    console.log("commonSyncRecordCRUDMethod", err);
  }
}

const recordExist = async (item, schema, existingRecord, object) => {
  try{
    let result = '';
    /**
     * Multiple Scenario will happen in this case.
     * case 2.1: SyncParameters are null
     * case 2.2: isDeleted = true and No errorInSync  
     */
    if(object.syncParameters == null){
      /**
       * This scenario will occur when records are successfully update in DB end.
       */
      object.syncParameters = existingRecord.syncParameters;
      console.log("recordExist syncParameters null -",object.syncParameters);
      if(object.syncParameters != null){
        object.syncParameters.requireSync = false;
        object.syncParameters.lastModifiedOn = new Date();
        // result = Constants.SUCCESS;
      }
      else{
        result = Constants.FAILURE;
      }
    }//syncParameters are null
    else{ //If syncParameters are not null then records are not successfully updated
      console.log("recordExist syncParameters are not null - ",object.syncParameters);
      //check if isDelete is true and there is no errorInSync
      if(object.syncParameters.isDeleted && !object.syncParameters.errorInSync){
        let deleteResult = deleteExistingRecord(schema[0],object.id);
        result = deleteResult;
        console.log("deleteResult ",deleteResult)
        if(deleteResult == Constants.SUCCESS){
          object = null;
          console.log("recordExist objected Delete - ",object);
        }
        else{
          console.log("recordExist object not deleted");
          result = Constants.FAILURE;
        }
      } //isDelete = true and errorInSync = false
      else{
        console.log("recordExist some conflict happened ")
        //This means there is some conflict in updating the records.
        object.syncParameters.requireSync = true;
        object.syncParameters.lastModifiedOn = new Date();
        result = Constants.CONFLICT;
      }
    }//else ends here
    if(object !== null && object.syncParameters != null){
      console.log("recordExist Object not null and can be modified - ",object);
      
      switch(item.name){
        case Constants.MASTER_MONTHLY_TABLE_PLAN:
          console.log("Constants.MASTER_MONTHLY_TABLE_PLAN");
          object.dailyPlannedActivities = [...object.dailyPlannedActivities.map((dailyPlan) => {
            if(dailyPlan.syncParameters != null){
              return dailyPlan;
            }
            return { ...dailyPlan , syncParameters: syncParametersObject}
          })]
          getDBInstance().create(schema[0].name,object,'modified');
          break;
        case Constants.MASTER_TABLE_PARTY:
          console.log("Constants.MASTER_TABLE_PARTY");
          getDBInstance().create(schema[0].name,object,'modified');
          break;
      }
      result = result == '' ? Constants.SUCCESS : result;
    }
    return result;
  }
  catch(err){
    console.log("recordExist",err);
    return Constants.FAILURE;
  }
}


const recordNotExist = async (item,schema, existingRecord, object) => {
  try{
    if(existingRecord == undefined || existingRecord == null){
      //Check if server sends its deleting confirmation on server DB side
      if(object.syncParameters != null && object.syncParameters.isDeleted){
        console.log("No issues in DB");
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
      if(object.syncParameters != null && object.syncParameters.devicePartyId != ''){ //case 1.1
        const existingFERecord = getDBInstance().objects(schema[0].name).filtered(`syncParameters.devicePartyId == "${object.syncParameters.devicePartyId}"`);
        console.log("check For existint record with devicePartyId ", existingFERecord);
        if(existingFERecord.length !== 0 && existingFERecord.length === 1){
          const existingObjectId = existingFERecord[0].id;
          console.log(existingObjectId,"Delete existing record with ID ",existingFERecord);
          deleteExistingRecord(schema[0],existingObjectId);
          object.syncParameters.requireSync = false;
          console.log("ModifyExisting record before ",object);
          let modifyResult = getDBInstance().create(schema[0].name,object,'modified');
          console.log("ModifyExisting record ",modifyResult);
          return Constants.SUCCESS;
        }
        else{
          //Conflict happened on both Side.
          console.log("Conflicts haapened 128")
          return Constants.CONFLICT;
        }
      }
      else if(object.syncParameters == null){ //case 1.2
        console.log("Entirely new record",item.name);
        //entirely new record
        switch(item.name){
          case Constants.MASTER_MONTHLY_TABLE_PLAN:
            console.log("Constants.MASTER_MONTHLY_TABLE_PLAN");
            return monthlyPlanOperations(getDBInstance()).createSingleRecord(schema,object);
          case Constants.MASTER_TABLE_PARTY:
            console.log("Constants.MASTER_TABLE_PARTY");
            return createSinglePartyMasterRecord(schema,object);
        }
        //return Constants.SUCCESS;
      }
      else{ //case 1.3
        console.log("Conflict at 139");
        // This scenario is conflict state when syncParameters are not null but devicePartyId = null
        return Constants.CONFLICT;
      }

    }// if condition end here for existingRecord reference check
  }catch(err){
    console.log("recordNotExist",err);
    return Constants.FAILURE;
  }
}


const deleteExistingRecord = (schema, id) => {
  try{
    let newData = getDBInstance().objects(schema.name).filtered(`id == ${id}`);
    console.log("deleteExistingRecord",newData);
    if(newData != undefined){
      console.log("Should Be deleted");
      getDBInstance().delete(newData[0]);
      newData = null;
      return Constants.SUCCESS;
    }
    console.log("Is it here");
    return Constants.FAILURE;
  }
  catch(err){
    console.log("deleteExistingRecord -",err);
    return Constants.FAILURE;
  }
}

const createSinglePartyMasterRecord = async (schema,object) => {
  try{
    console.log("schemaa",schema)
    console.log("object ",object);
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
      errorMessage: 'null'
    }
    let syncParametersObject = {
        devicePartyId: null,
        isActive: true,
        requireSync: false,
        lastModifiedOn: new Date(),
        isDeleted: false,
        errorInSync: false,
        syncErrorDetails: syncErrorDetailsObject
    }
    
    

    let partyMaster = getDBInstance().create(
      schema[0].name,
      {
        id: object.id,
        partyTypeId: object.partyTypeId,
        shortName: object.shortName,
        name: object.name ,
        qualification: object.qualification,
        frequency: object.frequency,
        category: object.category,
        potential: object.potential,
        isKyc: object.isKyc,
        syncParameters: object.syncParameters != null ?  object.syncParameters : syncParametersObject,
        partyTypes: partyTypes,
        alreadyVisited: object.alreadyVisited,
        shortName: object.shortName,
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
  }
  catch(err){
    console.log("createSinglePartyMasterRecord ",err);
    return Constants.FAILURE;
  }
}

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

let syncErrorDetailsObject = {
  conflictType: 'null',
  errorMessage: 'null'
}
export const syncParametersObject = {
  devicePartyId: null,
  isActive: true,
  requireSync: true,
  lastModifiedOn: new Date(),
  isDeleted: false,
  errorInSync: false,
  syncErrorDetails: syncErrorDetailsObject
}
