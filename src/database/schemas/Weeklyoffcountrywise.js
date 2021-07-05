import {GeoLocationConfigurationName} from './GeoLocationConfiguration';
const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
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
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
