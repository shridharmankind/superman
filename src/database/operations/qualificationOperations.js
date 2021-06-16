import {QualificationsSchemaName} from '../schemas/Qualifications';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  getQualification: async id => {
    return await dbInstance.findOne({id});
  },
  getQualifications: async () => {
    return await getAllTableRecords(QualificationsSchemaName);
  },
});
