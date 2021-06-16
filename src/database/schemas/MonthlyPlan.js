import * as Constants from '../constants';

export const monthlyPlanStatusDetails = {
    name: Constants.MASTER_MONTHLY_TABLE_STATUS,
    embedded: true,
    properties: {
      id: 'int?',
      name: 'string?'
    }
}

export const dailyPlanActivityTypeDto = {
    name: Constants.MASTER_DAILY_TABLE_ACTIVE_DTO,
    embedded: true,
    properties: {
        id: 'int?',
        name: 'string?',
        shortName: 'string?',
        isActive: 'bool?',
        isFieldActivity: 'bool?',
        isDisplay: 'bool?'
    }
}
export const dailyPlanNonActivityTypeDto = {
    name: Constants.MASTER_DAILY_TABLE_NON_ACTIVE_DTO,
    embedded: true,
    properties: {
        id: 'int?',
        name: 'string?',
        shortName: 'string?',
        activityTypeId: 'int?',
        durationTypeId: 'int?'
    }
}

export const monthlyMaster = {
    name: Constants.MASTER_MONTHLY_TABLE_PLAN,
    properties: {
      id: 'int',
      staffPositionId: 'int?',
      year: 'int?',
      month: 'int?',
      statusId: 'int?',
      isLocked: 'bool?',
      status: Constants.MASTER_MONTHLY_TABLE_STATUS,
      syncParameters : Constants.MASTER_SYNC_PARAMETERS,
      dailyPlannedActivities: {
        type: 'list',
        objectType: Constants.MASTER_DAILY_TABLE_PLAN,
      },
    },
    primaryKey: 'id',
  };
  
export const dailyMaster = {
    name: Constants.MASTER_DAILY_TABLE_PLAN,
    properties: {
        id: 'int',
        monthlyTourPlanId: 'int',
        day: 'int?',
        date: 'date?',
        isJointVisit: 'bool?',
        activityTypeId: 'int?',
        partyId: 'int?',
        patchId: 'int?',
        nonFieldActvityId: 'int?',
        isMissed: 'bool?',
        isAdhoc: 'bool?',
        activityTypeDto: Constants.MASTER_DAILY_TABLE_ACTIVE_DTO,
        nonFieldActivityDto: Constants.MASTER_DAILY_TABLE_NON_ACTIVE_DTO,
        syncParameters : Constants.MASTER_SYNC_PARAMETERS 
    },
    primaryKey: 'id',
};
