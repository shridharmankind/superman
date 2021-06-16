import {QualificationsSchemaName} from '../schemas/Qualifications';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeQualificationsPerDivision: async data => {
    let recordsUpdated = false;
    try {
      const qualifications = dbInstance.create(
        QualificationsSchemaName,
        {
          id: data.id,
          // other data
        },
        true,
      );

      // loop and create child table rows
      // qualifications.childData.push(child);
      // data.someChildData.forEach()

      recordsUpdated = true;
    } catch (err) {}

    return recordsUpdated;
  },
  getQualification: async id => {
    return await dbInstance.findOne({id});
  },
  getQualifications: async () => {
    return await getAllTableRecords(QualificationsSchemaName);
  },
});
