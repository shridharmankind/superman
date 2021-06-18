//Common
export const downloadStatus = Object.freeze({
  DOWNLOADED: 'DOWNLOADED',
  PENDING: 'PENDING',
});
export const HTTP_OK = 200;

export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CONFLICT = 'CONFLICT';

//ONLY Table Names
export const MASTER_TABLES_DOWNLOAD_STATUS = 'MasterTablesDownloadStatus';
export const APPLICATION_SYNC_STATUS = 'ApplicationSync';
//GENERIC TYPE
export const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
export const MASTER_SYNC_ERROR_DETAIL = 'SYNC_ERROR_DETAIL';

//Monthly Plan constants
export const MASTER_MONTHLY_TABLE_PLAN_SYNC_API_PATH = '/mtp/sync';
export const MASTER_MONTHLY_TABLE_PLAN_API_PATH = 'mtp/pull/';
export const MASTER_MONTHLY_TABLE_PLAN = 'Monthly';
export const MASTER_MONTHLY_TABLE_STATUS = 'Status';
export const MASTER_MONTHLY_TABLE_SYNC_PARAM = 'syncMonthlyTourPlanDtos';

//Daily Plan Constants
export const MASTER_DAILY_TABLE_PLAN = 'Daily';
export const MASTER_DAILY_TABLE_ACTIVE_DTO = 'activeDto';
export const MASTER_DAILY_TABLE_NON_ACTIVE_DTO = 'nonActiveDto';

// API Path and Master tables part of that API
export const MASTER_TABLE_PARTY_SYNC_API_PATH = 'party/sync';
export const MASTER_TABLE_PARTY_API_PATH = 'party/partyBySpId/';
export const MASTER_TABLE_PARTY = 'Party';
export const MASTER_TABLE_SPECIALITY = 'Speciality';
export const MASTER_TABLE_AREAS = 'Areas';
export const MASTER_TABLE_ENGAGEMENT = 'Engagement';
export const MASTER_TABLE_PARTY_TYPE_GROUP = 'PartyTypeGroup';
export const MASTER_TABLE_PARTY_TYPES = 'PartyTypes';
export const MASTER_TABLE_PARTY_SYNC_PARAM = 'syncPartyDtos';

export const MASTER_TABLE_USER_INFO_API_PATH = 'user/me';
export const MASTER_TABLE_USER_INFO = 'UserInfo';
export const MASTER_TABLE_STAFF_POSITIONS = 'StaffPositions';
export const MASTER_TABLE_STAFF_DESIGNATION = 'Designation';
