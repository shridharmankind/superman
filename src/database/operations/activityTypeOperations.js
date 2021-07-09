import {ActivityTypeSchemaName} from '../schemas/ActivityType';
import {getAllTableRecords} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeActivityType: async activityTypes => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        activityTypes.forEach(activityType => {
          dbInstance.create(Constants.ACTIVITY_TYPE, activityType, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllActivityType: async () => {
    return await getAllTableRecords(ActivityTypeSchemaName);
  },

  getActivityTypeById: async activityTypeId => {
    const activityType = await getAllTableRecords(ActivityTypeSchemaName);
    return activityType.filtered(`id = ${activityTypeId}`);
  },
});
