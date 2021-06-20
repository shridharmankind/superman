import Realm from 'realm';

import * as Operations from './operations';
import * as Helper from './helper';
import * as Schemas from './schemas';
import * as Constants from './constants';
import * as Sync from './sync';
import * as Offline from './offlineData';

export {Operations, Helper, Schemas, Constants, Sync, Offline};

const path = 'superman.realm';
const schemaVersion = 0;
const dbInstance = new Realm({
  path,
  schema: [
    Schemas.masterTablesDownLoadStatus,
    Schemas.userInfo,
    Schemas.staffPositions,
    Schemas.designation,
    Schemas.partyMaster,
    Schemas.specialities,
    Schemas.areas,
    Schemas.Qualifications.schema,
    Schemas.partyTypes,
    Schemas.partyTypeGroup,
    Schemas.engagement,
    Schemas.MonthlySchema.monthlyMaster,
    Schemas.MonthlySchema.dailyMaster,
    Schemas.MonthlySchema.monthlyPlanStatusDetails,
    Schemas.MonthlySchema.dailyPlanNonActivityTypeDto,
    Schemas.MonthlySchema.dailyPlanActivityTypeDto,
    Schemas.syncParameters,
    Schemas.syncErrorDetails,
  ],
  schemaVersion,
});

/**
 * Get a singleton DB instance
 * @return {Realm}
 */
export const getDBInstance = () => dbInstance;

/**
 * register DB operations
 */
export const Qualifications = Operations.qualificationOperations(dbInstance);
export const MonthlyPlan = Operations.monthlyPlanOperations(dbInstance);
