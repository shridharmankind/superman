import {DivisionSchemaName} from './schemas/Divisions';
import {QualificationsSchemaName} from './schemas/Qualifications';
import {SpecialitiesSchemaName} from './schemas/Specialities';

//Common
export const downloadStatus = Object.freeze({
  DOWNLOADED: 'DOWNLOADED',
  PENDING: 'PENDING',
});

//ONLY Table Names
export const MASTER_TABLES_DOWNLOAD_STATUS = 'MasterTablesDownloadStatus';

// API Path and Master tables part of that API
export const MASTER_TABLE_PARTY_API_PATH = 'Party/partyBySpId/';
export const MASTER_TABLE_PARTY = 'Party';
export const MASTER_TABLE_AREAS = 'Areas';
export const MASTER_TABLE_ENGAGEMENT = 'Engagement';
export const MASTER_TABLE_PARTY_TYPE_GROUP = 'PartyTypeGroup';
export const MASTER_TABLE_PARTY_TYPES = 'PartyTypes';

export const MASTER_TABLE_USER_INFO_API_PATH = 'user/me';
export const MASTER_TABLE_USER_INFO = 'UserInfo';
export const MASTER_TABLE_STAFF_POSITIONS = 'StaffPositions';
export const MASTER_TABLE_STAFF_DESIGNATION = 'Designation';

export const MASTER_TABLE_PARTY_CATEGORIES = 'PartyCategories';
export const MASTER_TABLE_PARTY_CATEGORIES_API_PATH = 'party/categories';

export const MASTER_TABLE_ORGANIZATION = 'Organizations';
export const MASTER_TABLE_ORGANIZATION_API_PATH = 'organization';

export const MASTER_TABLE_DIVISION = DivisionSchemaName;
export const MASTER_TABLE_DIVISION_API_PATH = 'division';

export const QUALIFICATIONS = QualificationsSchemaName;
export const SPECIALITIES = SpecialitiesSchemaName;
