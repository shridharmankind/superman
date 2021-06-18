import {QualificationsSchemaName} from '../schemas/Qualifications';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeQualificationsPerDivision: async qualifications => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        qualifications.forEach(qualification => {
          dbInstance.create(
            QualificationsSchemaName,
            qualification,
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }

    return recordsUpdated;
  },
  getQualification: async id => {
    return await dbInstance.objectForPrimaryKey(QualificationsSchemaName, id);
  },
  getQualifications: async () => {
    return await getAllTableRecords(QualificationsSchemaName);
  },
  getQualificationsByDivision: async divisionId => {
    const qualifications = await getAllTableRecords(QualificationsSchemaName);
    return await qualifications.filtered(`divisionId = ${divisionId}`);
  },
});

/** Sample usage */
/* const loadQualifications = async () => {
  const qualifications = await Qualifications.getQualifications();
  const qualification = await Qualifications.getQualification(2);
  const qualificationsByDivision =
    await Qualifications.getQualificationsByDivision(2);

  qualifications.forEach(qualificationItem => {
    console.log('DB qualifications', qualificationItem.name);
  });

  console.log('DB qualification by ID', qualification.name);

  qualificationsByDivision.forEach(qualificationItem => {
    console.log('DB qualifications by division ID', qualificationItem.name);
  });
};
loadQualifications(); */
