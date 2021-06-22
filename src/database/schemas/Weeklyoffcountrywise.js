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
      geoLocationConfiguration: 'GeoLocationConfiguration',
    },
  };
}
