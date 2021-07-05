import {
  PartyTableOperations,
  MonthlyTableOperations,
  DivisionSyncOperations,
  OrganizationSyncOperations,
  SpecialitySyncOperations,
  QualificationSyncOperations,
  MotherBrandSyncOperations,
  WeeklyOffSyncOperations,
  PartyCategorySyncOperations,
  SkuSyncOperations,
} from './operations';
import * as DBConstants from '../constants';

const SYNC_TASK_LIST = new Map();

export const getSyncTaskList = () => {
  /** Add Operation List here */
  if (SYNC_TASK_LIST.size <= 0) {
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_PARTY,
      new PartyTableOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_MONTHLY_TABLE_PLAN,
      new MonthlyTableOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_DIVISION,
      new DivisionSyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_ORGANIZATION,
      new OrganizationSyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.SPECIALITIES,
      new SpecialitySyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.QUALIFICATIONS,
      new QualificationSyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_MOTHER_BRAND,
      new MotherBrandSyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_WEEKLYOFF,
      new WeeklyOffSyncOperations(),
    );
    SYNC_TASK_LIST.set(
      DBConstants.MASTER_TABLE_PARTY_CATEGORIES,
      new PartyCategorySyncOperations(),
    );
    SYNC_TASK_LIST.set(DBConstants.MASTER_TABLE_SKU, new SkuSyncOperations());
  }
  return SYNC_TASK_LIST;
};

export {SYNC_TASK_LIST};
