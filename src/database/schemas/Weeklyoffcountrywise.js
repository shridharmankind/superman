import {MASTER_TABLE_GEOLOCATIONS_CONFIGURATION} from '../constants';
export const WeeklyoffSchemaName = 'Weeklyoff';
export default class WeeklyOffSchema {
  static schema = {
    name: WeeklyoffSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      geoLocationTypeId: 'int?',
      parentGeoLocationId: 'int?',
      divisionId: 'int?',
      isActive: 'bool?',
      isDeleted: 'bool?',
      geoLocationConfiguration: MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
    },
  };
}
