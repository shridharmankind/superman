export const MotherbrandType = 'MotherbrandType';
export default class MotherbrandTypeSchema {
  static schema = {
    name: MotherbrandType,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string', shortName: 'string'},
  };
}
