import {MASTER_TABLE_GEOLOCATIONS_CONFIGURATION} from '../constants';
export const GeoLocationSchemaName = 'GeoLocations';

export default class GeoLocationSchema {
  static schema = {
    name: GeoLocationSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string?',
      geoLocationTypeId: 'int',
      parentGeoLocationId: 'int?',
      divisionId: 'int?',
      isActive: 'bool?',
      isDeleted: 'bool?',
      geoLocationConfiguration: MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
    },
  };
}
