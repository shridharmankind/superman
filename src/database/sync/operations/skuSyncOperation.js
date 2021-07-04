import {Operations} from 'database';
export class SkuSyncOperations {
  constructor() {
    console.log('SkuSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.skuOperations(dbInstance()).createSingleRecord(object);
  }
}
