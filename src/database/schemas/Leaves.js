import {LeaveTypesSchemaName} from './LeaveTypes';

export const LeavesSchemaName = 'Leaves';

export default class LeavesSchema {
  static schema = {
    name: LeavesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      userId: 'string',
      leaveDate: 'date?',
      isApproved: 'bool?',
      approvedBy: 'int?',
      reason: 'string?',
      leaveTypes: {
        type: 'list',
        objectType: LeaveTypesSchemaName,
      },
    },
  };
}
