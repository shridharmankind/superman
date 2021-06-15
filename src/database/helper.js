import * as Constants from './constants';
import * as Schemas from './schemas';
import * as Operations from './operations';
import * as MonthlyPlanSchema from './schemasFolder/monthlyPlanSchema';

export const MASTER_TABLES_DETAILS = [
  {
    name: Constants.MASTER_TABLE_USER_INFO,
    apiPath: Constants.MASTER_TABLE_USER_INFO_API_PATH,
    schema: [Schemas.userInfo, Schemas.staffPositions, Schemas.designation],
  },
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
      Schemas.engagement,
    ],
  },
  {
    name: Constants.MASTER_MONTHLY_TABLE_PLAN,
    apiPath: Constants.MASTER_MONTHLY_TABLE_PLAN_API_PATH,
    schema: [
      MonthlyPlanSchema.monthlyMaster,
      MonthlyPlanSchema.dailyMaster,
    ]
  }
];

export const syncErrorDetails = {
  name: Constants.MASTER_SYNC_ERROR_DETAIL,
  embedded: true,
  properties: {
    conflictType: 'string',
    errorMessage: 'string'
  }
}

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
    syncErrorDetails: Constants.MASTER_SYNC_ERROR_DETAIL
  }
};

/**
 * This function is get logged in user first name
 * @returns user first name
 */
export const getUserFirstName = async () => {
  try {
    const record = await Operations.getRecord(
      Schemas.userInfo,
      Constants.USER_PRIMARY_KEY,
    );
    return record.firstName || '';
  } catch (error) {}
};

/**
 * This function provides logged in user staff position Id
 * @returns staff position Id
 */
export const getStaffPositionId = async () => {
  try {
    const record = await Operations.getRecord(
      Schemas.userInfo,
      Constants.USER_PRIMARY_KEY,
    );
    let staffPositionId;
    record?.staffPositions.forEach(obj => {
      if (obj?.isPrimary) {
        staffPositionId = obj.id;
      }
    });
    //Operations.closeDB();
    return staffPositionId;
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
    Operations.closeDB();
    return isPending;
  } catch (error) {}
};
