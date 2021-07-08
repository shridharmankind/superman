export const GeoLocationTypeSchemaName = 'GeoLocationType';
export default class GeoLocationTypeSchema {
  static schema = {
    name: GeoLocationTypeSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string?',
    },
  };
}
