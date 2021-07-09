import {ActivitiesSchemaName} from '../schemas/Activities';
import {getAllTableRecords} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeActivities: async Activities => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        Activities.forEach(activity => {
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
            ActivitiesSchemaName,
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

  getAllActivities: async () => {
    return await getAllTableRecords(ActivitiesSchemaName);
  },

  getActivitiesById: async activityId => {
    const activities = await getAllTableRecords(ActivitiesSchemaName);
    return activities.filtered(`id = ${activityId}`);
  },
});
