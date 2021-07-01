import * as Constants from '../constants';
export const OrganizationSchemaName = 'Organizations';

export default class OrganizationSchema {
  static schema = {
    name: OrganizationSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      syncParameters: Constants.MASTER_SYNC_PARAMETERS,
    },
  };
}
