import {Operations} from 'database';
export class PartyTableOperations {
  constructor() {
    console.log('PartyTableSyncOperation Created');
  }

  toString() {
    return JSON.stringify(this);
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.createSinglePartyMasterRecord(schema, object, dbInstance);
  }
}
