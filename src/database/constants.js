import {DivisionSchemaName} from './schemas/Divisions';
import {WeeklyoffSchemaName} from './schemas/Weeklyoffcountrywise';
import {QualificationsSchemaName} from './schemas/Qualifications';
import {SpecialitiesSchemaName} from './schemas/Specialities';

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
export const MASTER_TABLE_AREAS = 'Areas';
export const MASTER_TABLE_ENGAGEMENT = 'Engagement';
export const MASTER_TABLE_PARTY_TYPE_GROUP = 'PartyTypeGroup';
export const MASTER_TABLE_PARTY_TYPES = 'PartyTypes';
export const MASTER_TABLE_PARTY_SYNC_PARAM = 'syncPartyDtos';

export const MASTER_TABLE_USER_INFO_API_PATH = 'user/me';
export const MASTER_TABLE_USER_INFO = 'UserInfo';
export const MASTER_TABLE_STAFF_POSITIONS = 'StaffPositions';
export const MASTER_TABLE_STAFF_DESIGNATION = 'Designation';

export const MASTER_TABLE_SKU = 'SKUs';
export const MASTER_TABLE_SKU_API_PATH = 'sku';
export const MASTER_TABLE_SUBBRAND = 'SubBrand';

export const MASTER_TABLE_PARTY_CATEGORIES = 'PartyCategories';
export const MASTER_TABLE_PARTY_CATEGORIES_API_PATH = 'party/categories';

export const MASTER_TABLE_ORGANIZATION = 'Organizations';
export const MASTER_TABLE_ORGANIZATION_API_PATH = 'organization';

export const MASTER_TABLE_DIVISION = DivisionSchemaName;
export const MASTER_TABLE_DIVISION_API_PATH = 'division';

export const MASTER_TABLE_MOTHER_BRAND = 'MotherBrands';
export const MASTER_TABLE_MOTHER_BRAND_API_PATH = 'motherBrand';
export const MOTHER_BRAND_TYPE = 'MotherBrandType';
export const MOLECULES = 'Molecule';

export const MASTER_TABLE_WEEKLYOFF = WeeklyoffSchemaName;
export const MASTER_TABLE_WEEKLYOFF_API_PATH =
  'geolocation/weeklyoffcountrywise';
export const MASTER_TABLE_GEOLOCATIONS_CONFIGURATION =
  'GeoLocationConfiguration';

export const QUALIFICATIONS = QualificationsSchemaName;
export const SPECIALITIES = SpecialitiesSchemaName;
