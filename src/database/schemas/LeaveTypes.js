export const LeaveTypesSchemaName = 'LeaveTypes';

export default class LeaveTypesSchema {
  static schema = {
    name: LeaveTypesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
    },
  };
}
