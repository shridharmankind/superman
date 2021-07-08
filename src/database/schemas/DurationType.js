export const DurationType = 'DurationType';
export default class DurationTypeSchema {
  static schema = {
    name: DurationType,
    primaryKey: 'id',
    properties: {id: 'int', name: 'string?', shortName: 'string?'},
  };
}
