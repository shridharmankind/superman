import * as Constants from '../constants';
export const DivisionSchemaName = 'Divisions';

export default class DivisionSchema {
  static schema = {
    name: DivisionSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      maxPatchCount: 'int?',
      kycPartyLimit: 'int?',
      syncParameters: Constants.MASTER_SYNC_PARAMETERS
    },
  };
}
