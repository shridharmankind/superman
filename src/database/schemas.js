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

export const partyMaster = {
  name: Constants.MASTER_TABLE_PARTY,
  properties: {
    id: 'int',
    name: 'string',
    qualification: 'string?',
    frequency: 'int',
    partyType: 'string?',
    category: 'string',
    potential: 'float',
    isKyc: 'bool',
    areas: [{
      type: 'list',
      objectType: Constants.MASTER_TABLE_AREAS,
    }],
    speciality: [{type: 'string?[]'}],
  },
  primaryKey: 'id',
};

export const speciality = {
  name: Constants.MASTER_TABLE_SPECIALITY,
  properties: {
    name: 'string',
  },
  primaryKey: 'name',
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
