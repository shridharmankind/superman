import {Constants} from 'common';
import {MonthlyPlan, getDBInstance, Schemas, Operations} from 'database';

export const offlineData = async (config, exactApiPath) => {
  try {
    let response = null;
    switch (exactApiPath) {
      case Constants.API_PATH.GET_PARTIES:
        response = await getPartiesFromMTU(config);
        break;
      case Constants.API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN:
        response = await deletePartyFromDailyPlan(config);
      default:
        break;
    }
    return await response;
  } catch (error) {
    console.log('offlineData ', error);
  }
};

const deletePartyFromDailyPlan = async config => {
  let response = {
    date: null,
    status: null,
  };
  try {
    let schema = [Schemas.partyMaster];
    let splittedAPIData = config.url.split(/[/?&]+/);
    //let result = Operations.deleteExistingRecord(schema[0],)
    return response;
  } catch (err) {
    console.log('deletePartyFromDailyPlan', err);
    response.data = error;
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
    let data = config.url.split(/[/?&]+/);
    let getFilteredDailyRecord =
      await MonthlyPlan.filteredRecordBasedOnYear_Month_Day(schema[0], data);
    if (getFilteredDailyRecord != []) {
      for (const dailyObject of getFilteredDailyRecord) {
        let partyId = dailyObject.partyId;
        console.log('PartyId ', partyId);
        if (partyId != null) {
          let newPartyById = await getDBInstance().objectForPrimaryKey(
            schema[1].name,
            partyId,
          );
          if (newPartyById != undefined) {
            getPartiesById.push(newPartyById);
          }
        }
      }

      console.log('getPartiesById ', getPartiesById);
      response.data = getPartiesById;
      response.status = getPartiesById !== [] ? 200 : 404;
    }
    return response;
  } catch (error) {
    console.log('getPartiesFromMTU', error);
    response.data = error;
    response.status = 500;
    return response;
  }
};
