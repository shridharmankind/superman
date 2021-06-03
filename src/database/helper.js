import * as Constants from './constants';
import * as Schemas from './schemas';

export const MASTER_TABLES_DETAILS = [
  {
    name: Constants.MASTER_TABLE_PARTY,
    apiPath: Constants.MASTER_TABLE_PARTY_API_PATH,
    schema: [
      Schemas.partyMaster,
      Schemas.specialities,
      Schemas.areas,
      Schemas.qualifications,
      Schemas.partyTypeGroup,
      Schemas.partyTypes,
    ],
  },
  {
    name: Constants.MASTER_TABLE_USER_INFO,
    apiPath: Constants.MASTER_TABLE_USER_INFO_API_PATH,
    schema: [Schemas.userInfo, Schemas.staffPositions],
  },
];
