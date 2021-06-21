import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeDivisions: async divisions => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        divisions.forEach(division => {
          const {id, name, shortName, maxPatchCount, kycPartyLimit} = division;
          dbInstance.create(
            DivisionSchemaName,
            {id, name, shortName, maxPatchCount, kycPartyLimit},
            'modified',
          );
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
