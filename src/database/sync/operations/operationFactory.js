import {Constants, getDBInstance} from 'database';

export const getSyncOperations = async (item, data, operationObject) => {
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
        if (existingRecord === undefined || existingRecord == null) {
          recordNotExist(
            item,
            schema,
            existingRecord,
            object,
            operationObject,
          ).then(result => {
            resultArray.push(result);
          });
        } else {
          //case 2
          recordExist(
            item,
            schema,
            existingRecord,
            object,
            operationObject,
          ).then(result => {
            resultArray.push(result);
          });
        }
      }); //data forEach ends here
    });
    return resultArray;
  } catch (err) {
    console.log('OperationFactory -> getSyncOperations ', err);
  }
};

const recordNotExist = async (
  item,
  schema,
  existingRecord,
  object,
  operationObject,
) => {
  try {
    if (!existingRecord) {
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
        object.syncParameters.devicePartyId !== ''
      ) {
        //case 1.1
        const existingFERecord = getDBInstance()
          .objects(schema[0].name)
          .filtered(
            `syncParameters.devicePartyId == "${object.syncParameters.devicePartyId}"`,
          );
        if (existingFERecord.length !== 0 && existingFERecord.length === 1) {
          const existingObjectId = existingFERecord[0].id;
          if (typeof operationObject.deleteExistingRecord === 'function') {
            operationObject.deleteExistingRecord(schema[0], existingObjectId);
          } else {
            deleteExistingRecord(schema[0], existingObjectId);
          }
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
        if (typeof operationObject.createNewRecord === 'function') {
          return operationObject.createNewRecord(getDBInstance, schema, object);
        } else {
          console.log('Add method to add new record');
        }
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

const recordExist = async (
  item,
  schema,
  existingRecord,
  object,
  operationObject,
) => {
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
        if (deleteResult === Constants.SUCCESS) {
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
      if (typeof operationObject.addModifiedRecord === 'function') {
        operationObject.addModifiedRecord(getDBInstance, schema, object);
      } else {
        getDBInstance().create(schema[0].name, object, 'modified');
      }
      result = result === '' ? Constants.SUCCESS : result;
    }
    return result;
  } catch (err) {
    console.log('recordExist', err);
    return Constants.FAILURE;
  }
};

export const deleteExistingRecord = (schema, id) => {
  try {
    let newData = getDBInstance().objects(schema.name).filtered(`id == ${id}`);
    if (newData !== undefined && newData.length > 0) {
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
