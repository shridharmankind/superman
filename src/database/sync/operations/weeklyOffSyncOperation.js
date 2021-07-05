import {Operations} from 'database';
export class WeeklyOffSyncOperations {
  constructor() {
    console.log('WeeklyOffSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.weeklyoffOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
