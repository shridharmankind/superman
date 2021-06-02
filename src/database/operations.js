// All common DB operations should be declared in this file

import {sha512} from 'react-native-sha512';
import {Buffer} from 'buffer';
import base64js from 'base64-js';
import Realm from 'realm';
import {KeyChain} from 'helper';
import * as Schemas from './schemas';
const dbPath = 'superman.realm';
let realm;

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
export const openSchema = async schemaName => {
  try {
    //const key = await getDatabaseKey();
    realm = await Realm.open({
      path: dbPath,
      schema: [
        Schemas.masterTablesDownLoadStatus,
        Schemas.userInfo,
        Schemas.partyMaster,
        Schemas.staffPositions,
        Schemas.speciality,
        Schemas.areas,
      ],
      schemaVersion: 0,
    });
  } catch (error) {
    console.log('openSchema', error);
    await realm.close();
  }
};

export const createRecord = async (schema, record) => {
  try {
    await openSchema();

    let isRecordExists = await realm.objectForPrimaryKey(
      schema.name,
      record.name,
    );

    if (isRecordExists) {
      return;
    }
    await realm.write(() => {
      realm.create(schema.name, record);
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
export const updateRecord = async (schema, updatedvalue, idToUpdate) => {
  await openSchema();
  try {
    await realm.write(() => {
      let recordToUpdate = realm.objectForPrimaryKey(schema.name, idToUpdate);
      recordToUpdate.status = updatedvalue;
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
    console.log('success', records);
    return records;
  } catch (error) {
    console.log('getAllRecord', error);
  }
};

export const createUserInfoRecord = async (schema, data) => {
  try {
    await openSchema();
    let child;
    await realm.write(() => {
      let parent = realm.create(
        schema[0].name,
        {
          id: data.id,
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          userName: data.userName,
          ssoUserId: data.ssoUserId,
          designation: data.designation,
        },
        true,
      );
      data.staffPositions.forEach(obj => {
        child = realm.create(schema[1].name, obj, true);
        parent.staffPositions.push(child);
      });
    });
  } catch (error) {
    console.log('createUserInfoRecord', error);
  }
};

export const createPartyMasterRecord = async (schema, data) => {
  try {
    await openSchema();
    let specialization, area;
    await realm.write(() => {
      data.forEach(object => {
        let parent = realm.create(
          schema[0].name,
          {
            id: object.id,
            name: object.name,
            qualification: object.qualification,
            frequency: object.frequency,
            category: object.category,
            potential: object.potential,
            isKyc: object.isKyc,
          },
          true,
        );
        /*  object.speciality.forEach(obj => {
          specialization = realm.create(schema[1].name, obj, true);
          parent.speciality.push(specialization);
        }); */
        object.areas.forEach(obj => {
          area = realm.create(schema[2].name, obj, true);
          parent.areas.push(area);
        });
      });
    });
  } catch (error) {
    console.log('createPartyMasterRecord', error);
  }
};
