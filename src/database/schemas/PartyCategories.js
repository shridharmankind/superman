export const PartyCategorySchemaName = 'PartyCategories';

export default class PartyCategorySchema {
  static schema = {
    name: PartyCategorySchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      divisionId: 'int?',
      name: 'string',
      shortName: 'string?',
      startAmount: 'double?',
      endAmount: 'double?',
    },
  };
}
