const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
export const GeoLocationConfigurationName = 'GeoLocationConfiguration';
export default class GeoLocationConfigurationSchema {
  static schema = {
    name: GeoLocationConfigurationName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      geoLocationId: 'int',
      weekDayOff: 'int',
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
