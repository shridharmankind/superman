import {Operations} from 'database';
export class MonthlyTableOperations {
    constructor(){
        console.log("MonthlyTableSyncOperations Created");
    }

    toString(){
        return JSON.stringify(this);
    }

    createNewRecord(dbInstance, schema, object){
        return Operations.monthlyPlanOperations(dbInstance()).createSingleRecord(
            schema,
            object,
        );
    }

    addModifiedRecord(dbInstance,schema,object){
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
              getDBInstance().create(schema[1].name, dailyObject, 'modified');
              return dailyObject;
            }),
          ];
        return dbInstance().create(schema[0].name, object, 'modified');
    }
}
