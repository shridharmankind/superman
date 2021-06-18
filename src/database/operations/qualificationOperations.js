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
    return await dbInstance.findOne({id});
  },
  getQualifications: async () => {
    return await getAllTableRecords(QualificationsSchemaName);
  },
});
