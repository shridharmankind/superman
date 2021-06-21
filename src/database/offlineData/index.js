import {Constants} from 'common';
import {MonthlyPlan, getDBInstance, Schemas, Operations} from 'database';

export const offlineData = async (config, data, params, exactApiPath) => {
  try {
    let response = null;
    switch (exactApiPath) {
      case Constants.API_PATH.GET_PARTIES:
        response = await getPartiesFromMTU(config);
        break;
      case Constants.API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN:
        response = await deletePartyFromDailyPlan(config,data, params, exactApiPath);
        break;
      default:
        break;
    }
    return response;
  } catch (error) {
    console.log('offlineData ', error);
  }
};

const deletePartyFromDailyPlan = async (config, data, params, exactApiPath) => {
  try {
    let response = {
      data: null,
      status: null,
    };
    await getDBInstance().write(() => {
      let schema = [Schemas.MonthlySchema.monthlyMaster,Schemas.MonthlySchema.dailyMaster];
      let splittedAPIData = config.url.split(/[/?&]+/);
      let paramObject = {
        staffPositionId: parseInt(splittedAPIData[1]),
        partyId: parseInt(splittedAPIData[3]),
        year: data["year"],
        month: data["month"],
        day: data["day"]
      }
      let getFilteredDailyRecord = MonthlyPlan.filteredRecordBasedOnYear_Month_Day(schema[0], paramObject);
      if (getFilteredDailyRecord != []) {
        getFilteredDailyRecord.forEach((dailyObject) => {
          let partyId = dailyObject.partyId;
          if (partyId === paramObject.partyId) {
              dailyObject.syncParameters.isDeleted= true;
              dailyObject.syncParameters.lastModifiedOn = new Date();
              getDBInstance().create(schema[1].name,dailyObject,'modified');
          }
        }) 
      }    
    });

    response.data = 'Deleted';
    response.status = 200;
    return response;
  } catch (err) {
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
      day: parseInt(splittedAPIData[5].split('=')[1])
    }
    let getFilteredDailyRecord =
      await MonthlyPlan.filteredRecordBasedOnYear_Month_Day(schema[0], paramObject);
    if (getFilteredDailyRecord != []) {
      for (const dailyObject of getFilteredDailyRecord) {
        let partyId = dailyObject.partyId;
        if (partyId != null && !dailyObject.syncParameters.isDeleted) {
          let newPartyById = await getDBInstance().objectForPrimaryKey(
            schema[1].name,
            partyId,
          );
          if (newPartyById && !newPartyById.syncParameters.isDeleted ) {
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
