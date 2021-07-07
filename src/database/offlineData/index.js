import {Constants} from 'common';
import {MonthlyPlan, getDBInstance, Schemas} from 'database';

export const offlineData = async (config, exactApiPath) => {
  try {
    switch (exactApiPath) {
      case Constants.API_PATH.GET_PARTIES:
        return await getPartiesFromMTU(config);
      case Constants.API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN:
        return await deletePartyFromDailyPlan(config);
      default:
        return {};
    }
  } catch (error) {
    console.log('offlineData ', error);
  }
};

const deletePartyFromDailyPlan = async config => {
  let response = {
    data: null,
    status: null,
  };
  try {
    await getDBInstance().write(() => {
      let schema = [
        Schemas.MonthlySchema.monthlyMaster,
        Schemas.MonthlySchema.dailyMaster,
      ];
      let splittedAPIData = config.url.split(/[/?&]+/);
      let paramObject = {
        staffPositionId: parseInt(splittedAPIData[1]),
        partyId: parseInt(splittedAPIData[3]),
        year: config.data.year,
        month: config.data.month,
        day: config.data.day,
      };

      let getFilteredRecord = MonthlyPlan.filteredRecordBasedOnYear_Month_Day(
        schema[0],
        paramObject,
      );
      if (getFilteredRecord != []) {
        for (const dailyObject of getFilteredRecord) {
          let partyId = dailyObject.partyId;
          if (partyId === paramObject.partyId) {
            if (config.alreadyDeleted) {
              getDBInstance().delete(dailyObject);
            } else {
              dailyObject.syncParameters.isDeleted = true;
              dailyObject.syncParameters.lastModifiedOn = new Date();
              getDBInstance().create(schema[1].name, dailyObject, 'modified');
              const getMonthlyRecordObject =
                getDBInstance().objectForPrimaryKey(
                  schema[0].name,
                  dailyObject.monthlyTourPlanId,
                );
              getMonthlyRecordObject.syncParameters.requireSync = true;
              getMonthlyRecordObject.syncParameters.lastModifiedOn = new Date();

              getDBInstance().create(
                schema[0].name,
                getMonthlyRecordObject,
                'modified',
              );
            }
          }
        }
      }
    });

    response.data = 'Deleted';
    response.status = 200;
    return response;
  } catch (err) {
    console.log('err', response, err);
    response.data = err;
    response.status = 500;
    return response;
  }
};

const getPartiesFromMTU = async config => {
  let response = {
    data: null,
    status: null,
  };
  let getPartiesById = [];
  try {
    let schema = [Schemas.MonthlySchema.monthlyMaster, Schemas.partyMaster];
    let splittedAPIData = config.url.split(/[/?&]+/);
    let paramObject = {
      staffPositionId: parseInt(splittedAPIData[1]),
      year: parseInt(splittedAPIData[4].split('=')[1]),
      month: parseInt(splittedAPIData[3].split('=')[1]),
      day: parseInt(splittedAPIData[5].split('=')[1]),
    };
    let getFilteredRecord =
      await MonthlyPlan.filteredRecordBasedOnYear_Month_Day(
        schema[0],
        paramObject,
      );
    if (getFilteredRecord !== []) {
      for (const dailyObject of getFilteredRecord) {
        let partyId = dailyObject.partyId;
        if (
          partyId != null &&
          !dailyObject.syncParameters.isDeleted &&
          !dailyObject.isMissed
        ) {
          let newPartyById = await getDBInstance().objectForPrimaryKey(
            schema[1].name,
            partyId,
          );
          if (newPartyById && !newPartyById.syncParameters.isDeleted) {
            let visitData = getVisitDataPerParty(
              partyId,
              schema[0].name,
              paramObject,
            );
            let obj = JSON.parse(JSON.stringify(newPartyById));
            obj.visits = [...visitData];
            getPartiesById.push(obj);
          }
        }
      }
      response.data = getPartiesById;
      response.status = getPartiesById !== [] ? 200 : 404;
    }
    return response;
  } catch (error) {
    response.data = error;
    response.status = 500;
    return response;
  }
};

const getVisitDataPerParty = (partyId, schemaName, data) => {
  let dailyRecords = [];
  let visitData = [];
  const getMonthlyRecordObject = getDBInstance()
    .objects(schemaName)
    .filtered(
      `staffPositionId = ${data.staffPositionId} && year = ${data.year} && month = ${data.month}`,
    );
  if (getMonthlyRecordObject !== []) {
    for (const monthlyRecord of getMonthlyRecordObject) {
      if (monthlyRecord.dailyPlannedActivities !== []) {
        let getDailyRecordObjects = monthlyRecord.dailyPlannedActivities.filter(
          item => item.partyId === partyId,
        );
        dailyRecords = [...dailyRecords, ...getDailyRecordObjects];
      }
    }
    for (const dailyRecord of dailyRecords) {
      let currentDate = new Date();
      let statusValue = 'Completed';
      if (dailyRecord.date.getDate() > currentDate.getDate()) {
        statusValue = 'Upcoming';
      } else if (dailyRecord.date.getDate() === currentDate.getDate()) {
        statusValue = 'Completed';
      } else {
        statusValue = 'Missed';
      }
      let visitRecord = {
        date: dailyRecord.date,
        month: data.month,
        dcrSubmitted: '2021-07-07T10:34:25',
        isAdhoc: dailyRecord.isAdhoc,
        status: statusValue,
      };
      visitData = [...visitData, visitRecord];
    }
  }
  return visitData;
};

const checkTodayDate = (someDate, today) => {
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
