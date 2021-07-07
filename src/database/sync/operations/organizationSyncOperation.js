import {Operations} from 'database';
export class OrganizationSyncOperations {
  constructor() {
    console.log('OrganizationSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.organizationOperations(dbInstance()).createSingleRecord(
      object,
    );
  }
}
