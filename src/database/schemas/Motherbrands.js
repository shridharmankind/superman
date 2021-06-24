export const MotherbrandsSchemaName = 'Motherbrands';

export default class MotherbrandsSchema {
  static schema = {
    name: MotherbrandsSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      isFocused: 'bool',
      isPower: 'bool',
      molecule: 'Molecule',
      motherBrandType: 'MotherbrandType',
    },
  };
}
