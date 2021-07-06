import * as Constants from '../constants';
import {WeeklyoffSchemaName} from '../schemas/Weeklyoffcountrywise';
import {getAllTableRecords, syncParametersObject} from './common';
export default dbInstance => ({
  storeWeeklyoffs: async weeklyoffs => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        weeklyoffs?.forEach(geoLocation => {
          const {id, name, shortName, geoLocationConfiguration} = geoLocation;
          let configuration = null;
          if (geoLocationConfiguration) {
            configuration = dbInstance.create(
              Constants.MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
              {
                ...geoLocationConfiguration,
                syncParameters: syncParametersObject(),
              },
              'modified',
            );
          }
          dbInstance.create(
            WeeklyoffSchemaName,
            {
              id: id,
              name: name,
              shortName: shortName,
              geoLocationConfiguration: configuration,
              syncParameters: syncParametersObject(),
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
  createSingleRecord: weeklyoff => {
    let recordsUpdated = true;
    try {
      const {id, name, shortName, geoLocationConfiguration} = weeklyoff;
      const configuration = dbInstance.create(
        Constants.MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
        {
          ...geoLocationConfiguration,
          syncParameters: syncParametersObject(),
        },
        'modified',
      );
      dbInstance.create(
        WeeklyoffSchemaName,
        {
          id: id,
          name: name,
          shortName: shortName,
          geoLocationConfiguration: configuration,
          syncParameters: syncParametersObject(),
        },
        'modified',
      );
    } catch (err) {
      console.log(err);
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
});
