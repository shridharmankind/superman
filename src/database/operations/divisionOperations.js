import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeDivisions: async divisions => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        divisions.forEach(division => {
          dbInstance.create(DivisionSchemaName, division, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllDivisions: async () => {
    return await getAllTableRecords(DivisionSchemaName);
  },

  getDivisionById: async divisionId => {
    const divisions = await getAllTableRecords(DivisionSchemaName);
    return divisions.filtered(`id = ${divisionId}`);
  },
});
