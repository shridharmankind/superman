const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
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
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
