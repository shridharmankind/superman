export const MoleculeSchemaName = 'Molecule';
export default class MoleculeSchema {
  static schema = {
    name: MoleculeSchemaName,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string?', shortName: 'string?'},
  };
}
