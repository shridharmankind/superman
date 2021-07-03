import {Constants, getDBInstance} from 'database';

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

export const getLastSyncTime = async () => {
  try {
    const record = await getDBInstance().objects(
      Constants.MASTER_TABLES_DOWNLOAD_STATUS,
    );
    return record;
  } catch (error) {
    console.log('getLastSyncTime', error);
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

export const createSinglePartyMasterRecord = async (
  schema,
  object,
  dbInstance = null,
) => {
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
export const syncParametersObject = () => {
  return {
    devicePartyId: null,
    isActive: true,
    requireSync: false,
    lastModifiedOn: new Date(),
    isDeleted: false,
    errorInSync: false,
    syncErrorDetails: syncErrorDetailsObject,
  };
};
