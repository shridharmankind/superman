export const MotherBrandsSchemaName = 'MotherBrands';
import {
  MOLECULES,
  MOTHER_BRAND_TYPE,
  MASTER_SYNC_PARAMETERS,
} from '../constants';

export default class MotherBrandsSchema {
  static schema = {
    name: MotherBrandsSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      isFocused: 'bool?',
      isPower: 'bool?',
      molecule: MOLECULES,
      motherBrandType: MOTHER_BRAND_TYPE,
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
