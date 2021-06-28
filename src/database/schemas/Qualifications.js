import {DivisionSchemaName} from './Divisions';

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
    },
  };
}
