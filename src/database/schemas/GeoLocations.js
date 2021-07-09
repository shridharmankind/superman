export const GeoLocationSchemaName = 'GeoLocations';
import {
  MASTER_TABLE_GEO_LOCATIONS_CONFIGURATION,
  MASTER_TABLE_GEO_LOCATION_TYPE,
} from '../constants';

export default class GeoLocationSchema {
  static schema = {
    name: GeoLocationSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string?',
      parentGeoLocationId: 'int?',
      divisionId: 'int?',
      geoLocationConfiguration: MASTER_TABLE_GEO_LOCATIONS_CONFIGURATION,
      geoLocationType: MASTER_TABLE_GEO_LOCATION_TYPE,
    },
  };
}
