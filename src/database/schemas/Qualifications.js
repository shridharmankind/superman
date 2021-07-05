import {DivisionSchemaName} from './Divisions';
const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
export const QualificationsSchemaName = 'Qualifications';

export default class QualificationsSchema {
  static schema = {
    name: QualificationsSchemaName,
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
