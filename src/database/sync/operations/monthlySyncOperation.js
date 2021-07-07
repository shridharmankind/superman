import {Operations} from 'database';
import {deleteExistingRecord} from './operationFactory';
export class MonthlyTableOperations {
  constructor() {
    console.log('MonthlyTableSyncOperations Created');
  }

  toString() {
    return JSON.stringify(this);
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.monthlyPlanOperations(dbInstance()).createSingleRecord(
      schema,
      object,
    );
  }

  addModifiedRecord(dbInstance, schema, object) {
    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    const syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: false,
      lastModifiedOn: new Date(),
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };

    if (!object.syncParameters.errorInSync) {
      object.dailyPlannedActivities = [
        ...object.dailyPlannedActivities.filter(dailyPlan => {
          if (dailyPlan.syncParameters === null) {
            return dailyPlan;
          } else if (dailyPlan?.syncParameters?.isDeleted) {
            deleteExistingRecord(schema[1], dailyPlan.id);
          } else if (dailyPlan?.syncParameters !== null) {
            return dailyPlan;
          }
        }),
      ];

      object.dailyPlannedActivities = [
        ...object.dailyPlannedActivities.map(dailyPlan => {
          if (dailyPlan.syncParameters != null) {
            return dailyPlan;
          }
          syncParametersObject.lastModifiedOn = new Date();
          let dailyObject = {
            ...dailyPlan,
            syncParameters: syncParametersObject,
          };
          dbInstance().create(schema[1].name, dailyObject, 'modified');
          return dailyObject;
        }),
      ];
    }
    return dbInstance().create(schema[0].name, object, 'modified');
  }
}
