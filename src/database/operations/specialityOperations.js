import {SpecialitiesSchemaName} from '../schemas/Specialities';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storeSpecialities: async specialities => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        specialities.forEach(speciality => {
          dbInstance.create(
            SpecialitiesSchemaName,
            {...speciality, syncParameters: syncParametersObject()},
            'modified',
          );
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
  getSpecialityById: async specialityId => {
    const specialities = await getAllTableRecords(SpecialitiesSchemaName);
    return await specialities.filtered(`specialityId = ${specialityId}`);
  },
  getSpecialities: async () => {
    return await getAllTableRecords(SpecialitiesSchemaName);
  },
  getSpecialitiesByDivision: async divisionId => {
    const specialities = await getAllTableRecords(SpecialitiesSchemaName);
    return await specialities.filtered('divisions.id == $0', divisionId);
  },
  createSingleRecord: speciality => {
    let recordsUpdated = true;
    try {
      let syncParameters =
        speciality.syncParameters === undefined
          ? syncParametersObject()
          : speciality.syncParameters;
      dbInstance.create(
        SpecialitiesSchemaName,
        {...speciality, syncParameters},
        'modified',
      );
    } catch (err) {
      console.log(err);
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
});
