import {syncParametersObject} from './common';
export default dbInstance => ({
  createSingleRecord: (schema, data) => {
    return singleDailyRecord(dbInstance, schema, data);
  },
});

const singleDailyRecord = async (
  dbInstance,
  schema,
  object,
  monthlyObjectId,
) => {
  try {
    await dbInstance.write(() => {
      let dailyPlannedActivity = {
        id: object.id,
        monthlyTourPlanId: monthlyObjectId,
        day: object.day,
        date: object.date,
        isJointVisit: object.isJointVisit,
        activityTypeId: object.activityTypeId,
        partyId: object.partyId,
        patchId: object.patchId,
        nonFieldActvityId: object.nonFieldActvityId,
        isMissed: object.isMissed,
        isAdhoc: object.isAdhoc,
        activityTypeDto: object.activityTypeDto,
        nonFieldActivityDto: object.nonFieldActivityDto,
        syncParameters:
          object.syncParameters != null
            ? object.syncParameters
            : syncParametersObject(),
      };
      dbInstance.create(schema[1].name, dailyPlannedActivity, 'modified');
      let monthlyPlanObject = dbInstance.objectForPrimaryKey(
        schema[0].name,
        monthlyObjectId,
      );
      monthlyPlanObject.dailyPlannedActivities.push(dailyPlannedActivity);
      dbInstance.create(schema[0].name, monthlyPlanObject, 'modified');
    });
  } catch (err) {
    console.log('createDailyMasterRecord', err);
  }
};
