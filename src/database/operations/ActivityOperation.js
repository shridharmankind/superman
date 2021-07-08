import {ActivityType} from '../schemas/ActivityType';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeActivity: async Activity => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        Activity.forEach(activity => {
          const {id, name, shortName} = activity;

          dbInstance.create(
            ActivityType,
            {
              id,
              name,
              shortName,
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

  getAllActivity: async () => {
    return await getAllTableRecords(ActivityType);
  },

  getActivityById: async ActivityId => {
    const Activitys = await getAllTableRecords(ActivityType);
    return Activitys.filtered(`id = ${ActivityId}`);
  },
});
