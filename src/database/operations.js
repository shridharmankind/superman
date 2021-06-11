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
export const openSchema = async () => {
  try {
    //const key = await getDatabaseKey();
    realm = await Realm.open({
      path: dbPath,
      schema: [
        Schemas.masterTablesDownLoadStatus,
        Schemas.userInfo,
        Schemas.staffPositions,
        Schemas.partyMaster,
        Schemas.specialities,
        Schemas.areas,
        Schemas.qualifications,
        Schemas.partyTypes,
        Schemas.partyTypeGroup,
        Schemas.syncParameters,
        Schemas.syncErrorDetails
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
    console.log("Record found ",record);
    return record;
  } catch (error) {
    console.log('getRecord', error);
  }
};
export const updateRecord = async (schema, updatedvalue, idToUpdate,lastSync = new Date()) => {
  await openSchema();
  try {
    await realm.write(() => {
      let recordToUpdate = realm.objectForPrimaryKey(schema.name, idToUpdate);
      recordToUpdate.status = updatedvalue;
      recordToUpdate.lastSync = lastSync
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
    let child;
    console.log("data -- ",data);
    await realm.write(() => {
      let parent = realm.create(
        schema[0].name,
        {
          id: data.id,
          firstName: data.firstName,
          middleName: `${data.middleName}`,
          lastName: data.lastName,
          userName: data.userName,
          ssoUserId: data.ssoUserId,
          designation: "data.designation",
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

export const updatePartyMasterRecord = async (schema , data) => {
  try{
    let objectToBeDeleted = [];
    console.log("updatePartyMasterRecord started")
    await openSchema();
    await realm.write(() => {
      data.forEach(async (object) => {

        let recordToUpdate = realm.objectForPrimaryKey(schema[0].name, object.id);
        console.log("Existing -- ",JSON.stringify(recordToUpdate));
        console.log("From DB --- ",JSON.stringify(object));
        if(recordToUpdate == undefined || recordToUpdate == null){
          if(object.syncParameters != null && object.syncParameters.isDeleted){
            console.log("Not required")
            return;
          }
          console.log("undefined")
          const findRecord = realm.objects(schema[0].name).filtered(`name == "${object.name}"`);
          console.log(findRecord.length,"findRecord ",findRecord);
          if(findRecord.length === 0){
            let createNewRecord = [object];
            console.log("Fresh New Record",createNewRecord);
            createPartyMasterRecord(schema,createNewRecord);
            console.log("created");
          }
          else
          {
            //findRecord.id = object.id;
            
            console.log("newObject ID ",findRecord);
            let updatedObject = object;
            try{
              updatedObject.shortName = `${updatedObject.shortName}`
              updatedObject.syncParameters.syncErrorDetails.conflictType = `${updatedObject.syncParameters.syncErrorDetails.conflictType}`
              updatedObject.syncParameters.syncErrorDetails.errorMessage = `${updatedObject.syncParameters.syncErrorDetails.errorMessage}`
              realm.create(
                schema[0].name,
                updatedObject,
                'modified'
              );
              console.log("New record add",updatedObject)
              let newData = realm.objects(schema[0].name).filtered(`id == -1`);
              console.log("Data going to be delete ",newData);
              if(newData[0].id != undefined){
                realm.delete(newData[0]);
                newData = null;
                //recordToUpdate = null;
                console.log("deleted ",newData);
              }  
              return;
            }
            catch(err){
              console.log("delete -",err);
            }
          }
        }
        else{
          console.log("else 1");
          let updatedObject = object;
          //If syncParameters is null then records are successfully updated.
          if(updatedObject.syncParameters == null){
            //console.log("new-----------------")
            //console.log(recordToUpdate)
            updatedObject.syncParameters = recordToUpdate.syncParameters;
            //console.log(updatedObject);
            if(updatedObject.syncParameters != null){
              updatedObject.syncParameters.requireSync = false;
              updatedObject.syncParameters.lastModifiedOn = new Date();
            }
          }
          else{ //If syncParameters are not null then records are not successfully updated
            if(updatedObject.syncParameters.isDeleted && !updatedObject.syncParameters.errorInSync){
              objectToBeDeleted.push(updatedObject.id);
              console.log(updatedObject.id,"delete new way",objectToBeDeleted);

              try{
                let newData = realm.objects(schema[0].name).filtered(`id == ${updatedObject.id}`);
                //console.log("Data going to be delete ",newData);
                if(newData != undefined){
                  realm.delete(newData);
                  newData = null;
                  recordToUpdate = null;
                  //console.log("deleted ",newData);
                }  
              }
              catch(err){
                console.log("delete -",err);
              }
            }
            else{
              updatedObject.syncParameters.requireSync = true;
              updatedObject.syncParameters.lastModifiedOn = new Date();
            }
            
          }
          if(updatedObject.syncParameters != null && updatedObject.syncParameters.isDeleted){
            updatedObject = null;
          }
          
          

           recordToUpdate = updatedObject
           if(updatedObject !== null && updatedObject.syncParameters != null){
             updatedObject.shortName = `${updatedObject.shortName}`
             updatedObject.syncParameters.syncErrorDetails.conflictType = `${updatedObject.syncParameters.syncErrorDetails.conflictType}`
             updatedObject.syncParameters.syncErrorDetails.errorMessage = `${updatedObject.syncParameters.syncErrorDetails.errorMessage}`
             //updatedObject.syncParameters.devicePartyId = `${updatedObject.syncParameters.devicePartyId}`
            realm.create(
              schema[0].name,
              updatedObject,
              'modified'
            );
          }
          console.log("update Object",updatedObject);
          
          console.log("1 new --- ",JSON.stringify(object));
        }  
      })
    });
    
  }
  catch(error){
    console.log('updatePartyMasterRecord', error);
  }
}

export const createPartyMasterRecord = async (schema, data) => {
  try {
    await openSchema();
    let specialization, area, qualification, partyTypes, partyTypeGroup;
    await insertPartyTableData(schema,-1);
    await realm.write(() => {
      data.forEach((object,index) => {
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
          errorMessage: 'null'
        }
        let syncParametersObject = {
            devicePartyId: null,
            isActive: true,
            requireSync: (index % 3 == 0) ? true : false,
            lastModifiedOn: new Date(),
            isDeleted: (index % 5 == 0) ? true : false,
            errorInSync: false,
            syncErrorDetails: syncErrorDetailsObject
        }
        
        

        let partyMaster = realm.create(
          schema[0].name,
          {
            id: object.id,
            partyTypeId: object.partyTypeId,
            shortName: (index % 3 == 0) ? object.name: `${object.shortName}`,
            name: object.name ,
            qualification: object.qualification,
            frequency: object.frequency,
            category: object.category,
            potential: object.potential,
            isKyc: object.isKyc,
            syncParameters: syncParametersObject,
            partyTypes: partyTypes,
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


export async function insertPartyTableData(schema,id){
  let object = dummyPartyData;
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
        errorMessage: 'null'
      }
      let syncParametersObject = {
          devicePartyId: generateUUID(),
          isActive: true,
          requireSync: true,
          lastModifiedOn: new Date(),
          isDeleted: false,
          errorInSync: false,
          syncErrorDetails: syncErrorDetailsObject
      }
      
      

      let partyMaster = realm.create(
        schema[0].name,
        {
          id: id,
          staffPositionId: object.staffPositionId,
          partyTypeId: object.partyTypeId,
          shortName: `DOC`,
          name: `${object.name}`,
          qualification: object.qualification,
          frequency: object.frequency,
          category: object.category,
          potential: object.potential,
          isKyc: object.isKyc,
          syncParameters: syncParametersObject,
          partyTypes: partyTypes,
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

function generateUUID() { // Public Domain/MIT
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

let dummyPartyData = {
  "syncParameters": {
    "devicePartyId": generateUUID(),
    "isActive": true,
    "requireSync": true,
    "lastModifiedOn": new Date(),
    "isDeleted": false,
    "errorInSync": false,
    "syncErrorDetails": {
      "conflictType": "null",
      "errorMessage": "null"
    }
  },
  "id":-1,
  "name": `KESH RAUT`,
  "specialities": [],
  "qualifications": [],
  "frequency": 2,
  "alreadyVisited": 0,
  "partyTypes": {
    "id": 2,
    "name": "Chemist",
    "shortName": "Che",
    "partyTypeGroup": {
      "id": 2,
      "name": "Chemist",
      "shortName": "Chemist"
    }
  },
  "category": "B",
  "potential": 600000,
  "isKyc": false,
  "areas": [
    {
      "id": 9,
      "name": "Noida Sector 8",
      "shortName": "sec8"
    },
    {
      "id": 10,
      "name": "Noida Sector 9",
      "shortName": "sec9"
    }
  ],
  "shortName": "null",
  "birthday": null,
  "anniversary": null,
  "engagement": null,
  "selfDispensing": false,
  "staffPositionId": 1,
  "partyTypeId": 2
};
