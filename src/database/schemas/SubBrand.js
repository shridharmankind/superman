export const SubBrandSchemaName = 'SubBrand';
import {MASTER_TABLE_MOTHER_BRAND} from '../constants';

const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';

export default class SubBrandSchema {
  static schema = {
    name: SubBrandSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string?',
      shortName: 'string?',
      moleculeId: 'int',
      motherBrandId: 'int',
      isFocused: 'int?',
      isPower: 'int?',
      motherBrand: MASTER_TABLE_MOTHER_BRAND,
      syncParameters: MASTER_SYNC_PARAMETERS,
    },
  };
}
