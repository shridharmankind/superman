import {getAllTableRecords} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeGeoLocations: async geoLocations => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        geoLocations.forEach(geoLocation => {
          dbInstance.create(
            Constants.MASTER_TABLE_GEO_LOCATIONS,
            geoLocation,
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllGeoLocations: async () => {
    return await getAllTableRecords(Constants.MASTER_TABLE_GEO_LOCATIONS);
  },

  getGeoLocationById: async geoLocationId => {
    const geoLocations = await getAllTableRecords(
      Constants.MASTER_TABLE_GEO_LOCATIONS,
    );
    return geoLocations.filtered(`id = ${geoLocationId}`);
  },
});
