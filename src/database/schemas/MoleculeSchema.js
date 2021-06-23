export const MoleculeName = 'MoleculeSchema';
export default class MoleculeSchema {
  static schema = {
    name: MoleculeName,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string', shortName: 'string'},
  };
}
