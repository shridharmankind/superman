// TODO all ops need to be moved into the common ops file // clean this file

import {Buffer} from 'buffer';
import base64js from 'base64-js';
import {sha512} from 'react-native-sha512';

import {KeyChain} from 'helper';
import {getDBInstance} from 'database';
import {generateUUID} from './common';

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
    console.log('Record found ', record);
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
      console.log('recordToUpdate ', recordToUpdate);
    });
    return;
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

export const updatePartyMasterRecord = async (schema, data) => {
  try {
    let objectToBeDeleted = [];
    console.log('updatePartyMasterRecord started');
    await openSchema();
    await realm.write(async () => {
      await data.forEach(async object => {
        let recordToUpdate = realm.objectForPrimaryKey(
          schema[0].name,
          object.id,
        );
        console.log('Existing -- ', JSON.stringify(recordToUpdate));
        console.log('From DB --- ', JSON.stringify(object));
        if (recordToUpdate == undefined || recordToUpdate == null) {
          if (
            object.syncParameters != null &&
            object.syncParameters.isDeleted
          ) {
            //console.log("Not required")
            return;
          }
          //console.log("undefined")
          const findRecord = realm
            .objects(schema[0].name)
            .filtered(`name == "${object.name}"`);
          //console.log(findRecord.length,"findRecord ",findRecord);
          if (findRecord.length === 0) {
            let createNewRecord = [object];
            //console.log("Fresh New Record",createNewRecord);
            createPartyMasterRecord(schema, createNewRecord);
            //console.log("created");
          } else {
            //findRecord.id = object.id;

            //console.log("newObject ID ",findRecord);
            let updatedObject = object;
            try {
              updatedObject.shortName = `${updatedObject.shortName}`;
              updatedObject.syncParameters.syncErrorDetails.conflictType = `${updatedObject.syncParameters.syncErrorDetails.conflictType}`;
              updatedObject.syncParameters.syncErrorDetails.errorMessage = `${updatedObject.syncParameters.syncErrorDetails.errorMessage}`;
              realm.create(schema[0].name, updatedObject, 'modified');
              //console.log("New record add",updatedObject)
              let newData = realm.objects(schema[0].name).filtered('id == -1');
              //console.log("Data going to be delete ",newData);
              if (newData[0].id != undefined) {
                realm.delete(newData[0]);
                newData = null;
                //recordToUpdate = null;
                //console.log("deleted ",newData);
              }
              return;
            } catch (err) {
              console.log('delete -', err);
              return false;
            }
          }
        } else {
          //console.log("else 1");
          let updatedObject = object;
          //If syncParameters is null then records are successfully updated.
          if (updatedObject.syncParameters == null) {
            //console.log("new-----------------")
            //console.log(recordToUpdate)
            updatedObject.syncParameters = recordToUpdate.syncParameters;
            //console.log(updatedObject);
            if (updatedObject.syncParameters != null) {
              updatedObject.syncParameters.requireSync = false;
              updatedObject.syncParameters.lastModifiedOn = new Date();
            }
          } else {
            //If syncParameters are not null then records are not successfully updated
            if (
              updatedObject.syncParameters.isDeleted &&
              !updatedObject.syncParameters.errorInSync
            ) {
              objectToBeDeleted.push(updatedObject.id);
              //console.log(updatedObject.id,"delete new way",objectToBeDeleted);

              try {
                let newData = realm
                  .objects(schema[0].name)
                  .filtered(`id == ${updatedObject.id}`);
                //console.log("Data going to be delete ",newData);
                if (newData != undefined) {
                  realm.delete(newData);
                  newData = null;
                  recordToUpdate = null;
                  //console.log("deleted ",newData);
                }
              } catch (err) {
                console.log('delete -', err);
                return false;
              }
            } else {
              updatedObject.syncParameters.requireSync = true;
              updatedObject.syncParameters.lastModifiedOn = new Date();
            }
          }
          if (
            updatedObject.syncParameters != null &&
            updatedObject.syncParameters.isDeleted
          ) {
            updatedObject = null;
          }

          recordToUpdate = updatedObject;
          if (updatedObject !== null && updatedObject.syncParameters != null) {
            updatedObject.shortName = `${updatedObject.shortName}`;
            updatedObject.syncParameters.syncErrorDetails.conflictType = `${updatedObject.syncParameters.syncErrorDetails.conflictType}`;
            updatedObject.syncParameters.syncErrorDetails.errorMessage = `${updatedObject.syncParameters.syncErrorDetails.errorMessage}`;
            //updatedObject.syncParameters.devicePartyId = `${updatedObject.syncParameters.devicePartyId}`
            realm.create(schema[0].name, updatedObject, 'modified');
          }
          //console.log("update Object",updatedObject);

          //console.log("1 new --- ",JSON.stringify(object));
        }
      });
    });
    return true;
  } catch (error) {
    console.log('updatePartyMasterRecord', error);
    return false;
  }
};

var d1 = new Date(),
  d2 = new Date(d1);
d2.setMinutes(d1.getMinutes() + 30);
//console.log(d2);

export const createPartyMasterRecord = async (schema, data) => {
  try {
    await openSchema();
    let specialization,
      area,
      qualification,
      partyTypes,
      partyTypeGroup,
      engagement;
    await insertPartyTableData(schema, -1);
    await realm.write(() => {
      data.forEach((object, index) => {
        //console.log("object -- ",object);
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

        let syncErrorDetailsObject = {
          conflictType: 'null',
          errorMessage: 'null',
        };
        let syncParametersObject = {
          devicePartyId: null,
          isActive: true,
          requireSync: index % 3 == 0 ? true : false,
          lastModifiedOn: index % 3 == 0 ? d2 : new Date(),
          isDeleted: false,
          errorInSync: false,
          syncErrorDetails: syncErrorDetailsObject,
        };

        let partyMaster = realm.create(
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
          specialization = realm.create(schema[1].name, obj, 'modified');
          partyMaster.specialities.push(specialization);
        });
        object.areas?.forEach(obj => {
          area = realm.create(schema[2].name, obj, 'modified');
          partyMaster.areas.push(area);
        });
        object.qualifications?.forEach(obj => {
          qualification = realm.create(schema[3].name, obj, 'modified');
          partyMaster.qualifications.push(qualification);
        });
        object.engagement?.forEach(obj => {
          engagement = realm.create(schema[4].name, obj, 'modified');
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

export async function insertPartyTableData(schema, id) {
  let object = dummyPartyData;
  let specialization,
    area,
    qualification,
    partyTypes,
    partyTypeGroup,
    engagement;
  await realm.write(() => {
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

    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    let syncParametersObject = {
      devicePartyId: generateUUID(),
      isActive: true,
      requireSync: true,
      lastModifiedOn: d2,
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };

    let partyMaster = realm.create(
      schema[0].name,
      {
        id: object.id,
        partyTypeId: object.partyTypeId,
        shortName: 'DOC',
        name: object.name,
        qualification: object.qualification,
        frequency: object.frequency,
        category: object.category,
        potential: object.potential,
        isKyc: object.isKyc,
        syncParameters: syncParametersObject,
        partyTypes: partyTypes,
        alreadyVisited: object.alreadyVisited,
        birthday: object.birthday,
        anniversary: object.anniversary,
        selfDispensing: object.selfDispensing,
      },
      'modified',
    );

    object.specialities.forEach(obj => {
      specialization = realm.create(schema[1].name, obj, 'modified');
      partyMaster.specialities.push(specialization);
    });
    object.areas.forEach(obj => {
      area = realm.create(schema[2].name, obj, 'modified');
      partyMaster.areas.push(area);
    });
    object.qualifications.forEach(obj => {
      qualification = realm.create(schema[3].name, obj, 'modified');
      partyMaster.qualifications.push(qualification);
    });
    return;
  });
}

let dummyPartyData = {
  syncParameters: {
    devicePartyId: generateUUID(),
    isActive: true,
    requireSync: true,
    lastModifiedOn: d2,
    isDeleted: false,
    errorInSync: false,
    syncErrorDetails: {
      conflictType: 'null',
      errorMessage: 'null',
    },
  },
  id: -1,
  name: 'NIKI KUMAR',
  specialities: [],
  qualifications: [],
  frequency: 2,
  alreadyVisited: 0,
  partyTypes: {
    id: 1,
    name: 'Doctor',
    shortName: 'Che',
    partyTypeGroup: {
      id: 2,
      name: 'Chemist',
      shortName: 'Chemist',
    },
  },
  category: 'B',
  potential: 600000,
  isKyc: false,
  areas: [
    {
      id: 9,
      name: 'Noida Sector 8',
      shortName: 'sec8',
    },
    {
      id: 10,
      name: 'Noida Sector 9',
      shortName: 'sec9',
    },
  ],
  shortName: 'null',
  birthday: null,
  anniversary: null,
  engagement: null,
  selfDispensing: false,
  staffPositionId: 1,
  partyTypeId: 1,
};
export {default as qualificationOperations} from './qualificationOperations';
export {default as monthlyPlanOperations} from './MonthlyPlanOperations';
