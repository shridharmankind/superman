import {Operations} from 'database';
export class DivisionSyncOperations {
  constructor() {
    console.log('DivisionSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.divisionOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
