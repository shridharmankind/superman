export const ActivityType = 'ActivityType';
export default class ActivityTypeSchema {
  static schema = {
    name: ActivityType,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string', shortName: 'string'},
  };
}
