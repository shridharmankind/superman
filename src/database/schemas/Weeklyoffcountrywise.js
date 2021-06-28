import {GeoLocationConfigurationName} from './GeoLocationConfiguration';
export const WeeklyoffSchemaName = 'Weeklyoff';
export default class WeeklyOffSchema {
  static schema = {
    name: WeeklyoffSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      geoLocationConfiguration: GeoLocationConfigurationName,
    },
  };
}
