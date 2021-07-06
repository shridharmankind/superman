import {Operations} from 'database';
export class PartyCategorySyncOperations {
  constructor() {
    console.log('PartyCategorySyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.partyCategoryOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
