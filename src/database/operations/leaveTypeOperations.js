import {LeaveTypesSchemaName} from '../schemas/LeaveTypes';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeLeaveTypes: async leaveTypes => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        leaveTypes.forEach(leaveType => {
          dbInstance.create(LeaveTypesSchemaName, leaveType, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }

    return recordsUpdated;
  },
  getLeaveType: async id => {
    return await dbInstance.objectForPrimaryKey(LeaveTypesSchemaName, id);
  },
  getLeaveTypeByName: async name => {
    const leaves = await getAllTableRecords(LeaveTypesSchemaName);
    return await leaves.filtered(`name = ${name}`);
  },
  getLeaveTypes: async () => {
    return await getAllTableRecords(LeaveTypesSchemaName);
  },
});
