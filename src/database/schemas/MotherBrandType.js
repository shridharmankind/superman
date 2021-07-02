import * as Constants from '../constants';
export const MotherBrandSchemaName = 'MotherBrandType';
export default class MotherBrandTypeSchema {
  static schema = {
    name: MotherBrandSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      syncParameters: Constants.MASTER_SYNC_PARAMETERS,
    },
  };
}
