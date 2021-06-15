//Common
export const USER_PRIMARY_KEY = 1;
export const HTTP_OK = 200;
export const downloadStatus = Object.freeze({
  DOWNLOADED: 'DOWNLOADED',
  PENDING: 'PENDING',
});

//ONLY Table Names
export const MASTER_TABLES_DOWNLOAD_STATUS = 'MASTER_TABLES_DOWNLOAD_STATUS';

//GENERIC TYPE
export const MASTER_SYNC_PARAMETERS = 'SYNC_PARAMETER';
export const MASTER_SYNC_ERROR_DETAIL = 'SYNC_ERROR_DETAIL';

//Monthly Plan constants
export const MASTER_MONTHLY_TABLE_PLAN_API_PATH = 'mtp/pull/';
export const MASTER_MONTHLY_TABLE_PLAN = 'MONTHLY_PLAN';
export const MASTER_MONTHLY_TABLE_STATUS = 'STATUS';

//Daily Plan Constants
export const MASTER_DAILY_TABLE_PLAN = 'DAILY_PLAN';
export const MASTER_DAILY_TABLE_ACTIVE_DTO = 'ACTIVE_DTO';
export const MASTER_DAILY_TABLE_NON_ACTIVE_DTO = 'NON_ACTIVE_DTO';

// API Path and Master tables part of that API
export const MASTER_TABLE_PARTY_API_PATH = 'Party/partyBySpId/';
export const MASTER_TABLE_PARTY = 'PARTY';
export const MASTER_TABLE_SPECIALITY = 'SPECIALITY';
export const MASTER_TABLE_AREAS = 'AREAS';
export const MASTER_TABLE_ENGAGEMENT = 'ENGAGEMENT';
export const MASTER_TABLE_QUALIFICATIONS = 'QUALIFICATIONS';
export const MASTER_TABLE_PARTY_TYPE_GROUP = 'PARTY_TYPE_GROUP';
export const MASTER_TABLE_PARTY_TYPES = 'PARTY_TYPES';

export const MASTER_TABLE_USER_INFO_API_PATH = 'user/me';
export const MASTER_TABLE_USER_INFO = 'USER_INFO';
export const MASTER_TABLE_STAFF_POSITIONS = 'STAFF_POSITIONS';
export const MASTER_TABLE_STAFF_DESIGNATION = 'DESIGNATION';
