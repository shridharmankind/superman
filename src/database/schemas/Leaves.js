import {LeaveTypesSchemaName} from './LeaveTypes';

export const LeavesSchemaName = 'Leaves';

export default class LeavesSchema {
  static schema = {
    name: LeavesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      userId: 'int?',
      leaveDate: 'string?',
      isApproved: 'bool?',
      approvedBy: 'int?',
      reason: 'string?',
      leaveType: LeaveTypesSchemaName,
    },
  };
}
