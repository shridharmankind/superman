import * as Constants from '../constants';
import {generateUUID} from './common';
export default dbInstance => ({
  createMonthlyMasterRecord: async (schema, data) => {
    monthlyMasterRecord(dbInstance, schema, data);
  },
  createSingleRecord: (schema, data) => {
    return singleRecord(dbInstance, schema, data);
  },
  filteredRecordBasedOnYear_Month_Day: (schema, data) => {
    return getfilteredRecordBasedOnYear_Month_Day(dbInstance, schema, data);
  },
});

const getfilteredRecordBasedOnYear_Month_Day = (dbInstance, schema, data) => {
  try {
    //["mtp", "2", "parties", "Month=6", "Year=2021", "Day=19"]
    let dailyRecords = [];
    const getMonthlyRecordObject = dbInstance
      .objects(schema.name)
      .filtered(
        `staffPositionId = ${data.staffPositionId} && year = ${data.year} && month = ${data.month}`,
      );
    if (getMonthlyRecordObject != []) {
      for (const monthlyRecord of getMonthlyRecordObject) {
        if (monthlyRecord.dailyPlannedActivities != []) {
          let getDailyRecordObjects =
            monthlyRecord.dailyPlannedActivities.filter(
              item => item.day == data.day,
            );
          dailyRecords = [...dailyRecords, ...getDailyRecordObjects];
        }
      }
    }
    return dailyRecords;
  } catch (err) {
    console.log('getfilteredRecordBasedOnYear_Month_Day ', err);
    return err;
  }
};

const singleRecord = (dbInstance, schema, object) => {
  try {
    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    let syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: false,
      lastModifiedOn: new Date(),
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };
    let statusDetail = object.status;
    let monthlyPlan = dbInstance.create(
      schema[0].name,
      {
        id: object.id,
        staffPositionId: object.staffPositionId,
        year: object.year,
        month: object.month,
        statusId: object.statusId,
        isLocked: object.isLocked,
        status: statusDetail,
        syncParameters:
          object.syncParameters != null
            ? object.syncParameters
            : syncParametersObject,
      },
      'modified',
    );
    object.dailyPlannedActivities?.forEach(dailyPlan => {
      let obj;
      if (dailyPlan.syncParameters == null) {
        let syncParameters = syncParametersObject;
        obj = {...dailyPlan, ...syncParameters};
      } else {
        obj = {...dailyPlan};
      }
      let dailyPlannedActivity = dbInstance.create(
        schema[1].name,
        obj,
        'modified',
      );
      monthlyPlan.dailyPlannedActivities.push(dailyPlannedActivity);
    });
    return Constants.SUCCESS;
  } catch (err) {
    console.log('createSingleRecord ', err);
    return Constants.FAILURE;
  }
};

const monthlyMasterRecord = async (dbInstance, schema, data) => {
  try {
    let dailyPlannedActivity;
    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    let syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: false,
      lastModifiedOn: new Date(),
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };
    await dbInstance.write(() => {
      //singleRecord(dbInstance, schema, dummyObject);
      data.forEach(object => {
        let statusDetail = object.status;

        let monthlyPlan = dbInstance.create(
          schema[0].name,
          {
            id: object.id,
            staffPositionId: object.staffPositionId,
            year: object.year,
            month: object.month,
            statusId: object.statusId,
            isLocked: object.isLocked,
            status: statusDetail,
            syncParameters: syncParametersObject,
          },
          'modified',
        );
        object.dailyPlannedActivities?.forEach(dailyPlan => {
          let obj = {...dailyPlan, syncParameters: syncParametersObject};
          dailyPlannedActivity = dbInstance.create(
            schema[1].name,
            obj,
            'modified',
          );
          monthlyPlan.dailyPlannedActivities.push(dailyPlannedActivity);
        });
      }); //data.foreach ends here
    }); //realm.write ends here
  } catch (err) {
    console.log('createMonthlyMasterRecord ', err);
  }
};

let lastSyncRecordTime = new Date();
let d2 = new Date(lastSyncRecordTime);
d2.setMinutes(lastSyncRecordTime.getMinutes() + 10);

let syncErrorDetailsObject = {
  conflictType: 'null',
  errorMessage: 'null',
};
let syncParametersObject = {
  devicePartyId: generateUUID(),
  isActive: true,
  requireSync: false,
  lastModifiedOn: d2,
  isDeleted: false,
  errorInSync: false,
  syncErrorDetails: syncErrorDetailsObject,
};



let dummyObject = {
  id: -1,
  staffPositionId: 1,
  year: 2105,
  month: 10,
  statusId: 0,
  isLocked: true,
  status: null,
  syncParameters: syncParametersObject,
  dailyPlannedActivities: [
    {
      id: -1,
      monthlyTourPlanId: 0,
      day: 1,
      date: new Date(),
      isJointVisit: true,
      activityTypeId: 0,
      partyId: 0,
      patchId: 0,
      nonFieldActvityId: 0,
      isMissed: true,
      isAdhoc: true,
      activityTypeDto: {
        id: 0,
        name: 'string',
        shortName: 'string',
        isActive: true,
        isFieldActivity: true,
        isDisplay: true,
      },
      nonFieldActivityDto: {
        id: 0,
        name: 'string',
        shortName: 'string',
        activityTypeId: 0,
        durationTypeId: 0,
      },
      syncParameters: {
        devicePartyId: generateUUID(),
        isActive: true,
        requireSync: true,
        lastModifiedOn: d2,
        isDeleted: false,
        errorInSync: false,
        syncErrorDetails: syncErrorDetailsObject,
      },
    },
  ],
};
