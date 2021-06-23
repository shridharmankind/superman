export const MotherbrandTypeName = 'MotherbrandType';
export default class MotherbrandTypeSchema {
  static schema = {
    name: MotherbrandTypeName,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string', shortName: 'string'},
  };
}
