export const MotherBrandTypeSchemaName = 'MotherBrandTypes';

export default class MotherBrandTypeSchema {
  static schema = {
    name: MotherBrandTypeSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
    },
  };
}
