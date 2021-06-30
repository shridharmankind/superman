import {DivisionSchemaName} from './Divisions';
import * as Constants from '../constants';
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
      syncParameters: Constants.MASTER_SYNC_PARAMETERS,
    },
  };
}
