import * as Constants from '../constants';

export const masterTablesDownLoadStatus = {
  name: Constants.MASTER_TABLES_DOWNLOAD_STATUS,
  properties: {
    name: 'string',
    status: 'string',
  },
  primaryKey: 'name',
};

export const userInfo = {
  name: Constants.MASTER_TABLE_USER_INFO,
  properties: {
    id: 'int',
    firstName: 'string?',
    middleName: 'string?',
    lastName: 'string?',
    userName: 'string?',
    ssoUserId: 'string?',
    designation: Constants.MASTER_TABLE_STAFF_DESIGNATION,
    staffPositions: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_STAFF_POSITIONS,
    },
  },
  primaryKey: 'id',
};

export const staffPositions = {
  name: Constants.MASTER_TABLE_STAFF_POSITIONS,
  properties: {
    id: 'int',
    staffCode: 'int',
    reportingStaffPositionId: 'int?',
    divisionId: 'int?',
    role: 'int?',
    isActive: 'bool?',
    isPrimary: 'bool?',
  },
  primaryKey: 'id',
};

export const designation = {
  name: Constants.MASTER_TABLE_STAFF_DESIGNATION,
  properties: {
    id: 'int',
    name: 'string?',
    shortName: 'string?',
    isActive: 'bool?',
    isDeleted: 'bool?',
    divisionId: 'int?',
  },
  primaryKey: 'id',
};

export const partyMaster = {
  name: Constants.MASTER_TABLE_PARTY,
  properties: {
    id: 'int',
    name: 'string?',
    frequency: 'int',
    category: 'string?',
    potential: 'float',
    alreadyVisited: 'int?',
    isKyc: 'bool?',
    shortName: 'string?',
    birthday: 'string?',
    anniversary: 'string?',
    selfDispensing: 'bool',
    partyTypeId: 'int',

    partyTypes: Constants.MASTER_TABLE_PARTY_TYPES,
    areas: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_AREAS,
    },
    specialities: {
      type: 'list',
      objectType: Constants.SPECIALITIES,
    },
    qualifications: {
      type: 'list',
      objectType: Constants.QUALIFICATIONS,
    },
    engagement: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_ENGAGEMENT,
    },
  },
  primaryKey: 'id',
};

export const areas = {
  name: Constants.MASTER_TABLE_AREAS,
  properties: {
    id: 'int',
    name: 'string?',
    shortName: 'string?',
  },
  primaryKey: 'id',
};

export const partyTypes = {
  name: Constants.MASTER_TABLE_PARTY_TYPES,
  properties: {
    id: 'int',
    name: 'string?',
    shortName: 'string?',
    partyTypeGroup: Constants.MASTER_TABLE_PARTY_TYPE_GROUP,
  },
  primaryKey: 'id',
};

export const partyTypeGroup = {
  name: Constants.MASTER_TABLE_PARTY_TYPE_GROUP,
  properties: {
    id: 'int',
    name: 'string?',
    shortName: 'string?',
  },
  primaryKey: 'id',
};

export const engagement = {
  name: Constants.MASTER_TABLE_ENGAGEMENT,
  properties: {
    startDate: 'string?',
    endDate: 'string?',
  },
};

export {default as Divisions} from './Divisions';
export {default as Qualifications} from './Qualifications';
export {default as Organizations} from './Organizations';
export {default as Specialities} from './Specialities';
export {default as WeeklyOffSchema} from './Weeklyoffcountrywise';
export {default as GeoLocationConfiguration} from './GeoLocationConfiguration';
