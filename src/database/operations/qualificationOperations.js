import {QualificationsSchemaName} from '../schemas/Qualifications';
import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storeQualifications: async qualifications => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        qualifications.forEach(async qualification => {
          const {divisions = []} = qualification;

          const qualificationRecord = await dbInstance.create(
            QualificationsSchemaName,
            {...qualification, syncParameters: syncParametersObject()},
            'modified',
          );

          divisions.forEach(async division => {
            const divisionRecord = await dbInstance.create(
              DivisionSchemaName,
              {...division, syncParameters: syncParametersObject()},
              'modified',
            );
            qualificationRecord.divisions.push(divisionRecord);
          });
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
  getQualificationById: async qualificationId => {
    const qualifications = await getAllTableRecords(QualificationsSchemaName);
    return await qualifications.filtered(
      `qualificationId = ${qualificationId}`,
    );
  },
  getQualifications: async () => {
    return await getAllTableRecords(QualificationsSchemaName);
  },
  getQualificationsByDivision: async divisionId => {
    const qualifications = await getAllTableRecords(QualificationsSchemaName);
    return await qualifications.filtered(`divisions.id == ${divisionId}`);
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
