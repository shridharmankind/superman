import {MASTER_TABLE_DIVISION, MASTER_TABLE_SUB_BRAND} from '../constants';
export const SkuSchemaName = 'SKUs';

const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';

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
      isFocused: 'bool?',
      isPower: 'bool?',
      isSample: 'bool?',
      subBrand: MASTER_TABLE_SUB_BRAND,
      syncParameters: MASTER_SYNC_PARAMETERS,
      divisions: {
        type: 'list',
        objectType: MASTER_TABLE_DIVISION,
      },
    },
  };
}
