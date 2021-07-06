import {Operations} from 'database';
export class SpecialitySyncOperations {
  constructor() {
    console.log('SpecialitySyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.specialityOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
