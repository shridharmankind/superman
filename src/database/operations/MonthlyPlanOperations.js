import * as Constants from '../constants';
import {generateUUID} from './common';
export default dbInstance => ({
  createMonthlyMasterRecord: async (schema, data) => {
    monthlyMasterRecord(dbInstance, schema, data);
  },
  createSingleRecord: (schema, data) => {
    return singleRecord(dbInstance, schema, data);
  },
  filteredRecordBasedOnYear_Month_Day: async (schema, data) => {
    return getfilteredRecordBasedOnYear_Month_Day(dbInstance, schema, data);
  }
});

const getfilteredRecordBasedOnYear_Month_Day = async (dbInstance, schema, data) => {
  try{
    //["mtp", "2", "parties", "Month=6", "Year=2021", "Day=19"]
    let year = data[4].split('=');
    let month = data[3].split('=');
    let day = data[5].split('=');
    let dailyRecords = [];
    console.log("parseInt(day[1]) ",parseInt(day[1]));
    const getMonthlyRecordObject = await dbInstance.objects(schema.name)
                .filtered(`staffPositionId = ${parseInt(data[1])} && year = ${parseInt(year[1])} && month = ${parseInt(month[1])}`);
    console.log("getMonthlyRecordObject", getMonthlyRecordObject);
    if(getMonthlyRecordObject != []){
      console.log("1")
      for(const monthlyRecord of getMonthlyRecordObject){
        console.log("2");
        if(monthlyRecord.dailyPlannedActivities != []){
          let getDailyRecordObjects = monthlyRecord.dailyPlannedActivities
                                .filter((item) => item.day == parseInt(day[1]));
          console.log("getDailyRecordObjects ",getDailyRecordObjects);
          dailyRecords = [ ...dailyRecords, ...getDailyRecordObjects];
        }
      }
    }
    
    console.log('getfilteredRecordBasedOnYear_Month_Day ', dailyRecords);
    return dailyRecords;
  }
  catch(err){
    console.log("getfilteredRecordBasedOnYear_Month_Day ",err);
    return err;
  }
}

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
      console.log('dailyPlan ', obj);
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
    var d1 = new Date(),
      d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + 30);
    //console.log(d2);
    let syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: true,
      lastModifiedOn: d2,
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };
    await dbInstance.write(() => {
      singleRecord(dbInstance, schema, dummyObject);
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
            isLocked: !object.isLocked,
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

let syncErrorDetailsObject = {
  conflictType: 'null',
  errorMessage: 'null',
};
var d1 = new Date(),
  d2 = new Date(d1);
d2.setMinutes(d1.getMinutes() + 30);
//console.log(d2);
let syncParametersObject = {
  devicePartyId: generateUUID(),
  isActive: true,
  requireSync: true,
  lastModifiedOn: d2,
  isDeleted: false,
  errorInSync: false,
  syncErrorDetails: syncErrorDetailsObject,
};

let dummyObject = {
  id: -1,
  staffPositionId: 1,
  year: 2103,
  month: 7,
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
