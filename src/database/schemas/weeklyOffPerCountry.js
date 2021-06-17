export const WeeklyOffPerCountrySchemaName = 'WeeklyOffPerCountry';

export default class WeeklyOffPerCountrySchema {
  static schema = {
    name: WeeklyOffPerCountrySchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      geoLocationConfiguration: {
        id: 'int',
        geoLocationId: 'string?',
        weekDayOff: 'int',
      },
    },
  };
}
