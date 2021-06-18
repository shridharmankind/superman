import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  // example to be modified as requirement
  getDivisionById: async id => {
    return await dbInstance.findOne({id});
  },
  getAllDivision: async () => {
    return await getAllTableRecords(DivisionSchemaName);
  },
});
