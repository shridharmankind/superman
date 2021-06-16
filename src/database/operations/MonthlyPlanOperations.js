import * as MonthlyPlanSchema from '../schemas/MonthlyPlan';

export default dbInstance => ({
    createMonthlyMasterRecord: async(schema,data) => {
        monthlyMasterRecord(dbInstance,schema,data);
    }
}) 

const monthlyMasterRecord = async (dbInstance,schema,data) => {
    try{
        let dailyPlannedActivity;
        let syncErrorDetailsObject = {
        conflictType: 'null',
        errorMessage: 'null'
        }
        let syncParametersObject = {
            devicePartyId: null,
            isActive: true,
            requireSync: false,
            lastModifiedOn: new Date(),
            isDeleted: false,
            errorInSync: false,
            syncErrorDetails: syncErrorDetailsObject
        }
        await dbInstance.write(() => {
            data.forEach((object) => { 
                let statusDetail = object.status
                
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
                    syncParameters: syncParametersObject
                },
                'modified'
                );
                object.dailyPlannedActivities?.forEach((dailyPlan) => {
                    let obj = { ...dailyPlan, syncParameters: syncParametersObject};
                    dailyPlannedActivity = dbInstance.create(schema[1].name,obj,'modified');
                    monthlyPlan.dailyPlannedActivities.push(dailyPlannedActivity);
                }); 
            }); //data.foreach ends here
        }) //realm.write ends here
    }
    catch(err){
      console.log("createMonthlyMasterRecord ",err);
    }
}