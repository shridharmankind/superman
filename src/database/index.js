import Realm from 'realm';

import * as Operations from './operations';
import * as Helper from './helper';
import * as Schemas from './schemas';
import * as Constants from './constants';

export {Operations, Helper, Schemas, Constants};

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
    Schemas.PartyCategories.schema,
    Schemas.Organizations.schema,
    Schemas.Divisions.schema,
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
export const PartyCategories = Operations.partyCategoryOperations(dbInstance);
export const Organizations = Operations.organizationOperations(dbInstance);
export const Divisions = Operations.divisionOperations(dbInstance);
export const Specialities = Operations.specialityOperations(dbInstance);
