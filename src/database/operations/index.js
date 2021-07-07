// TODO all ops need to be moved into the common ops file // clean this file

import {Buffer} from 'buffer';
import base64js from 'base64-js';
import {sha512} from 'react-native-sha512';

import {KeyChain} from 'helper';
import {getDBInstance} from 'database';
import {
  generateUUID,
  deleteExistingRecord,
  deleteDBObject,
  modifyDBObject,
  createSinglePartyMasterRecord,
  getLastSyncTime,
  syncParametersObject,
} from './common';

let realm = null;

/*
 helper function to generarte key based on password/access-token
*/
export const getDatabaseKey = async () => {
  try {
    const dbKey = await KeyChain.getStoredDatabaseKey();
    return sha512(dbKey).then(hash => {
      const base64String = Buffer.from(hash, 'hex').toString('base64');
      const key = base64js.toByteArray(base64String);
      return key;
    });
  } catch (error) {
    console.log('getDatabaseKey', error);
  }
};

/*
Open/Create DB Schema
@schemaName - Scheama Name
*/
export const openSchema = async () => {
  !realm && (realm = getDBInstance());
};

export const createRecord = async (schema, record) => {
  try {
    await openSchema();
    await realm.write(() => {
      realm.create(schema.name, record, 'modified');
    });
  } catch (error) {
    console.log('createRecord', error);
  }
};

export const getRecord = async (schema, recordId) => {
  await openSchema();
  try {
    const record = await realm.objectForPrimaryKey(schema.name, recordId);
    return record;
  } catch (error) {
    console.log('getRecord', error);
  }
};
export const updateRecord = async (
  schema,
  updatedvalue,
  idToUpdate,
  lastSync = new Date(),
) => {
  await openSchema();
  try {
    await realm.write(() => {
      let recordToUpdate = realm.objectForPrimaryKey(schema.name, idToUpdate);
      recordToUpdate.status = updatedvalue;
      recordToUpdate.lastSync = lastSync;
    });
  } catch (error) {
    console.log('updateRecord', error);
  }
};

/*
 For getting all record
 @schema- schema name
*/
export const getAllRecord = async schema => {
  try {
    await openSchema();
    const records = await realm.objects(schema.name);
    return records;
  } catch (error) {
    console.log('getAllRecord', error);
  }
};

export const createUserInfoRecord = async (schema, data) => {
  try {
    await openSchema();
    let child, designation;
    await realm.write(() => {
      designation = realm.create(schema[2].name, data.designation, 'modified');

      let parent = realm.create(
        schema[0].name,
        {
          id: data.id,
          firstName: data.firstName,
          middleName: `${data.middleName}`,
          lastName: data.lastName,
          userName: data.userName,
          ssoUserId: data.ssoUserId,
          designation: designation,
        },
        'modified',
      );
      data?.staffPositions.forEach(obj => {
        child = realm.create(schema[1].name, obj, 'modified');
        parent.staffPositions.push(child);
      });
    });
  } catch (error) {
    console.log('createUserInfoRecord', error);
  }
};

let lastSyncRecordTime = new Date();
let d2 = new Date(lastSyncRecordTime);
d2.setMinutes(lastSyncRecordTime.getMinutes() + 10);

export const createPartyMasterRecord = async (schema, data) => {
  try {
    await openSchema();
    let specialization,
      area,
      qualification,
      partyTypes,
      partyTypeGroup,
      engagement;
    //await insertPartyTableData(schema, -1);
    await realm.write(() => {
      data.forEach((object, index) => {
        partyTypeGroup = realm.create(
          schema[4].name,
          object.partyTypes?.partyTypeGroup,
          'modified',
        );
        partyTypes = realm.create(
          schema[5].name,
          {...object.partyTypes, ...partyTypeGroup},
          'modified',
        );

        let partyMaster = realm.create(
          schema[0].name,
          {
            id: object.id,
            shortName: object.shortName,
            name: object.name,
            qualification: object.qualification,
            frequency: object.frequency,
            category: object.category,
            gender: object.gender,
            potential: object.potential,
            isKyc: object.isKyc,
            syncParameters:
              object.syncParameters != null
                ? object.syncParameters
                : syncParametersObject(),
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
          obj.divisions = obj.divisions.map(division => {
            return {
              ...division,
              syncParameters: syncParametersObject(),
            };
          });
          specialization = realm.create(
            schema[1].name,
            {...obj, syncParameters: syncParametersObject()},
            'modified',
          );
          partyMaster.specialities.push(specialization);
        });
        object.areas?.forEach(obj => {
          area = realm.create(
            schema[2].name,
            {...obj, syncParameters: syncParametersObject()},
            'modified',
          );
          partyMaster.areas.push(area);
        });
        object.qualifications?.forEach(obj => {
          obj.divisions = obj.divisions.map(division => {
            return {
              ...division,
              syncParameters: syncParametersObject(),
            };
          });
          qualification = realm.create(
            schema[3].name,
            {...obj, syncParameters: syncParametersObject()},
            'modified',
          );
          partyMaster.qualifications.push(qualification);
        });
        object.engagement?.forEach(obj => {
          engagement = realm.create(
            schema[4].name,
            {...obj, syncParameters: syncParametersObject()},
            'modified',
          );
          partyMaster.engagement.push(engagement);
        });
      });
    });
  } catch (error) {
    console.log('createPartyMasterRecord', error);
  }
};

export const closeDB = () => {
  if (realm) {
    realm.close();
  }
};

export {default as qualificationOperations} from './qualificationOperations';
export {default as skuOperations} from './skuOperations';
export {default as monthlyPlanOperations} from './MonthlyPlanOperations';
export {
  generateUUID,
  deleteExistingRecord,
  deleteDBObject,
  modifyDBObject,
  createSinglePartyMasterRecord,
  getLastSyncTime,
  syncParametersObject,
};
export {default as partyCategoryOperations} from './partyCategoryOperations';
export {default as organizationOperations} from './organizationOperations';
export {default as divisionOperations} from './divisionOperations';
export {default as specialityOperations} from './specialityOperations';
export {default as motherBrandOperations} from './motherBrandOperations';
export {default as weeklyoffOperations} from './weeklyoffOperation';
