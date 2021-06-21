import {WeeklyOffPerCountrySchemaName} from '../schemas/weeklyOffPerCountry';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  weeklyOff: async weeklyoff => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        weeklyoff.forEach(weekly => {
          dbInstance.create(WeeklyOffPerCountrySchemaName, weekly, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllWeeklyOffs: async () => {
    return await getAllTableRecords(WeeklyOffPerCountrySchemaName);
  },
});
