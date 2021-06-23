export const MotherBrandSchemaName = 'MotherBrands';
import * as constants from '../constants';

export default class MotherBrandSchema {
  static schema = {
    name: MotherBrandSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      isFocused: 'bool?',
      isPower: 'bool?',
      molecule: constants.MOLECULES,
      motherBrandType: constants.MOTHER_BRAND_TYPE,
    },
  };
}
