export const SubBrandSchemaName = 'SubBrand';

export default class SubBrandSchema {
  static schema = {
    name: SubBrandSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      moleculeId: 'int',
      motherBrandId: 'int',
      isFocused: 'int?',
      isPower: 'int?',
    },
  };
}
