import {LeavesSchemaName} from '../schemas/Leaves';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeLeaves: async leaves => {
    let recordsUpdated = true;

    try {
      await dbInstance.write(() => {
        leaves.forEach(leave => {
          dbInstance.create(LeavesSchemaName, leave, 'modified');
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }

    return recordsUpdated;
  },
  getLeave: async id => {
    return await dbInstance.objectForPrimaryKey(LeavesSchemaName, id);
  },
  getLeaveForUser: async userId => {
    const leaves = await getAllTableRecords(LeavesSchemaName);
    return await leaves.filtered(`userId = ${userId}`);
  },
  getLeaves: async () => {
    return await getAllTableRecords(LeavesSchemaName);
  },
  getLeavesApprovedByUser: async approverId => {
    const leaves = await getAllTableRecords(LeavesSchemaName);
    return await leaves.filtered(`approverId = ${approverId}`);
  },
});
