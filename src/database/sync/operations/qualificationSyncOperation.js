import {Operations} from 'database';
export class QualificationSyncOperations {
  constructor() {
    console.log('QualificationSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.qualificationOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
