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
    if (getFilteredRecord != []) {
      for (const dailyObject of getFilteredRecord) {
        let partyId = dailyObject.partyId;
        if (partyId != null && !dailyObject.syncParameters.isDeleted) {
          let newPartyById = await getDBInstance().objectForPrimaryKey(
            schema[1].name,
            partyId,
          );
          if (
            newPartyById &&
            !newPartyById.syncParameters.isDeleted &&
            !newPartyById.isMissed
          ) {
            getPartiesById.push(newPartyById);
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
