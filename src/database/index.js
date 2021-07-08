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
    Schemas.Specialities.schema,
    Schemas.areas,
    Schemas.Qualifications.schema,
    Schemas.partyTypes,
    Schemas.partyTypeGroup,
    Schemas.engagement,
    Schemas.Skus.schema,
    Schemas.SubBrand.schema,
    Schemas.MonthlySchema.monthlyMaster,
    Schemas.MonthlySchema.dailyMaster,
    Schemas.MonthlySchema.monthlyPlanStatusDetails,
    Schemas.MonthlySchema.dailyPlanNonActivityTypeDto,
    Schemas.MonthlySchema.dailyPlanActivityTypeDto,
    Schemas.syncParameters,
    Schemas.syncErrorDetails,
    Schemas.PartyCategories.schema,
    Schemas.Organizations.schema,
    Schemas.Divisions.schema,
    Schemas.MotherBrands.schema,
    Schemas.MotherBrandType.schema,
    Schemas.Molecule.schema,
    Schemas.WeeklyOffSchema.schema,
    Schemas.GeoLocationConfiguration.schema,
    Schemas.GeoLocations.schema,
    Schemas.GeoLocationType.schema,
    Schemas.Leaves.schema,
    Schemas.LeaveTypes.schema,
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
export const Skus = Operations.skuOperations(dbInstance);
export const MonthlyPlan = Operations.monthlyPlanOperations(dbInstance);
export const PartyCategories = Operations.partyCategoryOperations(dbInstance);
export const Organizations = Operations.organizationOperations(dbInstance);
export const Divisions = Operations.divisionOperations(dbInstance);
export const Specialities = Operations.specialityOperations(dbInstance);
export const MotherBrands = Operations.motherBrandOperations(dbInstance);
export const Weeklyoff = Operations.weeklyoffOperations(dbInstance);
export const geoLocations = Operations.geoLocationOperations(dbInstance);
export const Leaves = Operations.leaveOperations(dbInstance);
export const LeaveTypes = Operations.leaveTypeOperations(dbInstance);
