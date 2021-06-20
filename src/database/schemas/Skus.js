import {MASTER_TABLE_SUBBRAND} from '../constants';
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
      subBrand: MASTER_TABLE_SUBBRAND,
    },
  };
}
