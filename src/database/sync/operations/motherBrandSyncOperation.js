import {Operations} from 'database';
export class MotherBrandSyncOperations {
  constructor() {
    console.log('MotherBrandSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.motherBrandOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
