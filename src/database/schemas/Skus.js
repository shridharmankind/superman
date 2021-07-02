import {MASTER_TABLE_DIVISION, MASTER_TABLE_SUB_BRAND} from '../constants';
export const SkuSchemaName = 'SKUs';

export default class SkuSchema {
  static schema = {
    name: SkuSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      description: 'string?',
      maximumRetailPrice: 'double?',
      priceToStockist: 'double?',
      isFocused: 'int?',
      isPower: 'int?',
      isSample: 'int?',
      subBrand: MASTER_TABLE_SUB_BRAND,
      divisions: {
        type: 'list',
        objectType: MASTER_TABLE_DIVISION,
      },
    },
  };
}
