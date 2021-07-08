import * as Constants from './constants';
import * as Schemas from './schemas';
import * as Operations from './operations';
import {getActiveUser} from './operations/common';
import {ActivityType} from 'database';

import {NetworkService} from 'services';

export const MASTER_TABLES_DETAILS = [
  {
    name: Constants.MASTER_TABLE_USER_INFO,
    apiPath: Constants.MASTER_TABLE_USER_INFO_API_PATH,
    schema: [Schemas.userInfo, Schemas.staffPositions, Schemas.designation],
  },
  {
    name: Constants.MASTER_TABLE_PARTY,
    apiPath: Constants.MASTER_TABLE_PARTY_API_PATH,
    syncApiPath: Constants.MASTER_TABLE_PARTY_SYNC_API_PATH,
    syncParam: Constants.MASTER_TABLE_PARTY_SYNC_PARAM,
    schema: [
      Schemas.partyMaster,
      Schemas.Specialities.schema,
      Schemas.areas,
      Schemas.Qualifications.schema,
      Schemas.partyTypeGroup,
      Schemas.partyTypes,
      Schemas.engagement,
      Schemas.ActivityTypes.schema,
      Schemas.ActivityType.schema,
      Schemas.DurationType.schema,
    ],
  },
  {
    name: Constants.MASTER_TABLE_SKU,
    apiPath: Constants.MASTER_TABLE_SKU_API_PATH,
    schema: [
      Schemas.Skus.schema,
      Schemas.SubBrand.schema,
      Schemas.Divisions.schema,
    ],
  },
  {
    name: Constants.MASTER_MONTHLY_TABLE_PLAN,
    apiPath: Constants.MASTER_MONTHLY_TABLE_PLAN_API_PATH,
    syncApiPath: Constants.MASTER_MONTHLY_TABLE_PLAN_SYNC_API_PATH,
    syncParam: Constants.MASTER_MONTHLY_TABLE_SYNC_PARAM,
    schema: [
      Schemas.MonthlySchema.monthlyMaster,
      Schemas.MonthlySchema.dailyMaster,
    ],
  },
  {
    name: Constants.MASTER_TABLE_PARTY_CATEGORIES,
    apiPath: Constants.MASTER_TABLE_PARTY_CATEGORIES_API_PATH,
    schema: [Schemas.PartyCategories.schema],
  },
  {
    name: Constants.MASTER_TABLE_ORGANIZATION,
    apiPath: Constants.MASTER_TABLE_ORGANIZATION_API_PATH,
    schema: [Schemas.Organizations.schema],
  },
  {
    name: Constants.MASTER_TABLE_DIVISION,
    apiPath: Constants.MASTER_TABLE_DIVISION_API_PATH,
    schema: [Schemas.Divisions.schema],
  },
  {
    name: Constants.QUALIFICATIONS,
    apiPath: NetworkService.API.FETCH_QUALIFICATIONS,
    schema: [Schemas.Qualifications.schema],
  },
  {
    name: Constants.SPECIALITIES,
    apiPath: NetworkService.API.FETCH_SPECIALITIES,
    schema: [Schemas.Specialities.schema],
  },
  {
    name: Constants.MASTER_TABLE_WEEKLYOFF,
    apiPath: Constants.MASTER_TABLE_WEEKLYOFF_API_PATH,
    schema: [
      Schemas.WeeklyOffSchema.schema,
      Schemas.GeoLocationConfiguration.schema,
    ],
  },
  {
    name: Constants.MASTER_TABLE_MOTHER_BRAND,
    apiPath: Constants.MASTER_TABLE_MOTHER_BRAND_API_PATH,
    schema: [
      Schemas.MotherBrands.schema,
      Schemas.MotherBrandType.schema,
      Schemas.Molecule.schema,
    ],
  },
  {
    name: Constants.MASTER_TABLE_ACTIVITY_TYPES,
    apiPath: Constants.MASTER_TABLE_ACTIVITY_TYPES_API_PATH,
    schema: [Schemas.ActivityTypes.schema],
  },
  {
    name: Constants.ACTIVITY_TYPE,
    apiPath: Constants.MASTER_TABLE_ACTIVITY_TYPE_API_PATH,
    schema: [Schemas.ActivityType.schema],
  },
];

export const syncErrorDetails = {
  name: Constants.MASTER_SYNC_ERROR_DETAIL,
  embedded: true,
  properties: {
    conflictType: 'string',
    errorMessage: 'string',
  },
};

export const syncParameters = {
  name: Constants.MASTER_SYNC_PARAMETERS,
  embedded: true, // default: false
  properties: {
    devicePartyId: 'string?',
    isActive: 'bool',
    requireSync: 'bool',
    lastModifiedOn: 'date',
    isDeleted: 'bool',
    errorInSync: 'bool',
    syncErrorDetails: Constants.MASTER_SYNC_ERROR_DETAIL,
  },
};

/**
 * This function is get logged in user first name
 * @returns user first name
 */
export const getUserName = async () => {
  try {
    const user = await getActiveUser();
    const x = await ActivityType.getAllActivity();
    console.log(
      'xxbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      x,
    );
    const {firstName = '', lastName = ''} = user;
    return `${firstName} ${lastName}`;
  } catch (error) {}
};

/**
 * This function provides logged in user staff position Id
 * @returns staff position Id
 */
export const getStaffPositionId = async () => {
  try {
    const user = await getActiveUser();

    const primaryStaffPositions =
      (await user.staffPositions.filter(
        staffPosition => staffPosition.isPrimary,
      )) || [];
    const primaryStaffPosition = primaryStaffPositions[0] || {};
    return primaryStaffPosition?.id;
  } catch (error) {}
};

/**
 * This function to check if any master table is pending to download
 * @returns true/false
 */
export const checkForPendingMasterDataDownload = async () => {
  try {
    const record = await Operations.getAllRecord(
      Schemas.masterTablesDownLoadStatus,
    );

    if (record && record.length === 0) {
      return true;
    }

    let isPending = false;
    record.forEach(obj => {
      if (obj.status === Constants.downloadStatus.PENDING) {
        isPending = true;
      }
    });
    // Operations.closeDB();
    return isPending;
  } catch (error) {}
};
