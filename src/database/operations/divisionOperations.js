import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storeDivisions: async divisions => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        divisions.forEach(division => {
          const {id, name, shortName, maxPatchCount, kycPartyLimit} = division;
          let syncParameters =
            division.syncParameters === undefined
              ? syncParametersObject()
              : division.syncParameters;
          dbInstance.create(
            DivisionSchemaName,
            {id, name, shortName, maxPatchCount, kycPartyLimit, syncParameters},
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
  createSingleRecord: division => {
    let recordsUpdated = true;
    try {
      const {id, name, shortName, maxPatchCount, kycPartyLimit} = division;
      let syncParameters =
        division.syncParameters === undefined
          ? syncParametersObject()
          : division.syncParameters;
      dbInstance.create(
        DivisionSchemaName,
        {id, name, shortName, maxPatchCount, kycPartyLimit, syncParameters},
        'modified',
      );
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
});
