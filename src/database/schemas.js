import * as Constants from './constants';

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
    firstName: 'string',
    middleName: 'string',
    lastName: 'string',
    userName: 'string',
    ssoUserId: 'string',
    designation: 'string?',
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
    reportingStaffPositionId: 'int',
    divisionId: 'int',
    role: 'int',
    isActive: 'bool',
    isPrimary: 'bool',
  },
  primaryKey: 'id',
};

export const errorDetails = {
  name: 'ERROR_DETAILS',
  embedded: true,
  properties: {
    errorCode: 'string',
    message: 'string'
  }
};

export const partyMaster = {
  name: Constants.MASTER_TABLE_PARTY,
  properties: {
    id: 'int',
    name: 'string',
    qualification: 'string?',
    frequency: 'int',
    category: 'string',
    potential: 'float',
    isKyc: 'bool',
    device_party_id: 'string',
    isActive: 'bool',
    requireSync: 'bool',
    lastModifiedOn: 'string',
    isDelete: 'bool',
    errorInSync: 'bool',
    errorDetails: errorDetails,
    areas: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_AREAS,
    },
    specialities: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_SPECIALITY,
    },
    qualifications: {
      type: 'list',
      objectType: Constants.MASTER_TABLE_QUALIFICATIONS,
    },
  },
  primaryKey: 'id',
};

export const specialities = {
  name: Constants.MASTER_TABLE_SPECIALITY,
  properties: {
    id: 'int',
    name: 'string',
    shortName: 'string',
  },
  primaryKey: 'id',
};

export const areas = {
  name: Constants.MASTER_TABLE_AREAS,
  properties: {
    id: 'int',
    name: 'string',
    shortName: 'string',
  },
  primaryKey: 'id',
};

export const qualifications = {
  name: Constants.MASTER_TABLE_QUALIFICATIONS,
  properties: {
    id: 'int',
    name: 'string',
    shortName: 'string',
  },
  primaryKey: 'id',
};
