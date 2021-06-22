import * as Constants from '../constants';
import {WeeklyoffSchemaName} from '../schemas/Weeklyoffcountrywise';
import {getAllTableRecords} from './common';
export default dbInstance => ({
  storeWeeklyoffs: async weeklyoffs => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        weeklyoffs?.forEach(geoLocation => {
          const {
            id,
            name,
            shortName,
            geoLocationTypeId,
            parentGeoLocationId,
            divisionId,
            isActive,
            isDeleted,
            geoLocationConfiguration,
          } = geoLocation;
          const configuration = dbInstance.create(
            Constants.MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
            geoLocationConfiguration,
            'modified',
          );
          dbInstance.create(
            WeeklyoffSchemaName,
            {
              id: id,
              name: name,
              shortName: shortName,
              geoLocationTypeId: geoLocationTypeId,
              parentGeoLocationId: parentGeoLocationId,
              divisionId: divisionId,
              isActive: isActive,
              isDeleted: isDeleted,
              geoLocationConfiguration: configuration,
            },
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllWeeklyOffs: async () => {
    return await getAllTableRecords(WeeklyoffSchemaName);
  },

  getWeeklyOffsById: async weeklyoffId => {
    const weeklyoffs = await getAllTableRecords(WeeklyoffSchemaName);
    return weeklyoffs.filtered(`id = ${weeklyoffId}`);
  },
});
