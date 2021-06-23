export const MoleculeSchemaName = 'Molecules';

export default class MoleculeSchema {
  static schema = {
    name: MoleculeSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
    },
  };
}
