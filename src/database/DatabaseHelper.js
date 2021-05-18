// All common DB operations should be declared in this file

import {sha512} from 'react-native-sha512';
import {Buffer} from 'buffer';
import base64js from 'base64-js';
import Realm from 'realm';
const dbPath = 'superman.realm';
let realm;

/*
 helper function to generarte key based on password/access-token
*/
export const getDatabaseKey = async credentials => {
  //await Keychain.setGenericPassword('username', 'password'); // delete it
  // const credentials = await Keychain.getGenericPassword();
  return sha512(credentials.password).then(hash => {
    const base64String = Buffer.from(hash, 'hex').toString('base64');
    const key = base64js.toByteArray(base64String);
    return key;
  });
};

export const openSchema = async schemaName => {
  const key = await getDatabaseKey();
  realm = await Realm.open({
    path: dbPath,
    encryptionKey: key,
    schema: [schemaName],
  });
};

export const createRecord = async (schema, record) => {
  await openSchema(schema);
  realm.write(() => {
    realm.create(schema.name, record);
  });
  realm.close();
};

export const getAllRecord = async schema => {
  await openSchema(schema);
  const records = realm.objects(schema.name);
  realm.close();
  return records;
};
