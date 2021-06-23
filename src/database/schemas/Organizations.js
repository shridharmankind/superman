export const OrganizationSchemaName = 'Organizations';

export default class OrganizationSchema {
  static schema = {
    name: OrganizationSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
    },
  };
}
