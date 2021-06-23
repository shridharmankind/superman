import {SpecialitiesSchemaName} from '../schemas/Specialities';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeSpecialities: async specialities => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        specialities.forEach(speciality => {
          dbInstance.create(SpecialitiesSchemaName, speciality, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }

    return recordsUpdated;
  },
  getSpeciality: async id => {
    return await dbInstance.objectForPrimaryKey(SpecialitiesSchemaName, id);
  },
  getSpecialities: async () => {
    return await getAllTableRecords(SpecialitiesSchemaName);
  },
  getSpecialitiesByDivision: async divisionId => {
    const specialities = await getAllTableRecords(SpecialitiesSchemaName);
    return await specialities.filtered(`divisionId = ${divisionId}`);
  },
});
