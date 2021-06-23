import * as Constants from './constants';
import * as Schemas from './schemas';
import * as Operations from './operations';
import {getActiveUser} from './operations/common';

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
    schema: [
      Schemas.partyMaster,
      Schemas.Specialities.schema,
      Schemas.areas,
      Schemas.Qualifications.schema,
      Schemas.partyTypeGroup,
      Schemas.partyTypes,
      Schemas.engagement,
    ],
  },
  {
    name: Constants.MASTER_TABLE_ORGANIZATION,
    apiPath: Constants.MASTER_TABLE_ORGANIZATION_API_PATH,
  },
  {
    name: Constants.MASTER_TABLE_DIVISION,
    apiPath: Constants.MASTER_TABLE_DIVISION_API_PATH,
  },
  {
    name: Constants.QUALIFICATIONS,
    apiPath: NetworkService.API.FETCH_QUALIFICATIONS,
  },
  {
    name: Constants.SPECIALITIES,
    apiPath: NetworkService.API.FETCH_SPECIALITIES,
  },
  {
    name: Constants.MOTHER_BRAND,
    apiPath: Constants.MOTHER_BRAND_API_PATH,
  },
];

/**
 * This function is get logged in user first name
 * @returns user first name
 */
export const getUserName = async () => {
  try {
    const user = await getActiveUser();
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
