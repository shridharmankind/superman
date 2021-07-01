import {ActivityTypesSchemaName} from '../schemas/ActivityTypes';
import {getAllTableRecords} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeActivityTypes: async activityTypes => {
    console.log(
      'activity types yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
      activityTypes,
    );
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        activityTypes.forEach(activity => {
          const {id, name, shortName, activityType, durationType} = activity;
          const activityTypeChild = dbInstance.create(
            Constants.ACTIVITY_TYPE,
            activityType,
            'modified',
          );
          const durationTypeTypeChild = dbInstance.create(
            Constants.DURATION_TYPE,
            durationType,
            'modified',
          );
          dbInstance.create(
            ActivityTypesSchemaName,
            {
              id,
              name,
              shortName,
              activityType: activityTypeChild,
              durationType: durationTypeTypeChild,
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

  getAllActivityTypes: async () => {
    return await getAllTableRecords(ActivityTypesSchemaName);
  },

  getActivityTypesById: async ActivityTypesId => {
    const ActivityTypess = await getAllTableRecords(ActivityTypesSchemaName);
    return ActivityTypess.filtered(`id = ${ActivityTypesId}`);
  },
});
