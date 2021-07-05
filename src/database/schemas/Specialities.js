import {DivisionSchemaName} from './Divisions';

const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';

export const SpecialitiesSchemaName = 'Specializations';
export default class SpecialitiesSchema {
  static schema = {
    name: SpecialitiesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      divisions: {
        type: 'list',
        objectType: DivisionSchemaName,
      },
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
