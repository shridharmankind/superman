import * as Constants from '../constants';
export const ActivitiesSchemaName = 'Activities';

export default class ActivitiesSchema {
  static schema = {
    name: ActivitiesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      activityType: Constants.ACTIVITY_TYPE,
      durationType: Constants.DURATION_TYPE,
    },
  };
}
