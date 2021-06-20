export const DivisionSchemaName = 'Divisions';
import * as Constants from '../constants';

export default class DivisionSchema {
  static schema = {
    name: DivisionSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      maxPatchCount: 'int?',
      kycPartyLimit: 'int?',
      designations: {
        type: 'list',
        objectType: Constants.MASTER_TABLE_STAFF_DESIGNATION,
      },
      geoLocations: {
        type: 'list',
        objectType: Constants.MASTER_TABLE_GEOLOCATIONS,
      },
      staffPositions: {
        type: 'list',
        objectType: Constants.MASTER_TABLE_STAFF_POSITIONS,
      },
    },
  };
}
