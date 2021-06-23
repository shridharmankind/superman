export const SpecialitiesSchemaName = 'Specialities';

export default class SpecialitiesSchema {
  static schema = {
    name: SpecialitiesSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      specialisationId: 'int',
      name: 'string?',
      shortName: 'string?',
      divisionId: 'int?',
      isActive: 'bool?',
      isDeleted: 'bool?',
    },
  };
}
