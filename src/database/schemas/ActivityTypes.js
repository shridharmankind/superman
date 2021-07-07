import * as Constants from '../constants';
export const ActivityTypesSchemaName = 'ActivityTypes';

export default class DivisionSchema {
  static schema = {
    name: ActivityTypesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      activityType: 'ActivityType',
      durationType: 'DurationType',
    },
  };
}
