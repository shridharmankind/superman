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
      activityType: Constants.ACTIVITY_TYPE,
      durationType: Constants.DURATION_TYPE,
    },
  };
}
