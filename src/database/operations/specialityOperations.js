import {SpecialitiesSchemaName} from '../schemas/Specialities';
import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storeSpecialities: async specialities => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        specialities.forEach(async speciality => {
          const {divisions = []} = speciality;

          const specializationRecord = await dbInstance.create(
            SpecialitiesSchemaName,
            {...speciality, syncParameters: syncParametersObject()},
            'modified',
          );

          divisions.forEach(async division => {
            const divisionRecord = await dbInstance.create(
              DivisionSchemaName,
              { ...division, syncParameters: syncParametersObject()},
              'modified',
            );
            specializationRecord.divisions.push(divisionRecord);
          });
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
    return await specialities.filtered(`divisions.id == ${divisionId}`);
  },
});
