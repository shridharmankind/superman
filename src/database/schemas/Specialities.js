import {DivisionSchemaName} from './Divisions';
import * as Constants from '../constants';
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
      syncParameters: Constants.MASTER_SYNC_PARAMETERS,
    },
  };
}
