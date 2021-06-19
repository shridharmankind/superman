import {Constants} from 'common';
import {MonthlyPlan,getDBInstance} from 'database';
import {monthlyMaster,partyMaster} from '../schemas';

export const offlineData = async (config,apiPath) => {
    try{
        console.log("config ",config);
        console.log("apiPath ",apiPath)
        let response = null;
        switch(apiPath){
            case Constants.API_PATH.GET_PARTIES:
                console.log("case found");
                response = await getPartiesFromMTU(config);
                break;
            default:
                break;;
        }
        console.log("working now");
        return await response;
    }catch(error){
        console.log("getOfflineData ",error);
    }
}

const getPartiesFromMTU = async(config) => {
    let response = {
        data: null,
        status: null
    }
    let getPartiesById = [];
    try {
        let schema = [
            monthlyMaster,
            partyMaster
        ];
        let data = config.url.split(/[/?&]+/);
        console.log(data);
        let getFilteredDailyRecord = await MonthlyPlan.filteredRecordBasedOnYear_Month_Day(schema[0],data);
        console.log('getPartiesFromMTU ', getFilteredDailyRecord);
        if(getFilteredDailyRecord != []){
            for(const dailyObject of getFilteredDailyRecord){
                let partyId = dailyObject.partyId;
                console.log("PartyId ",partyId);
                if(partyId != null){
                    let newPartyById = await getDBInstance().objectForPrimaryKey(
                        schema[1].name,
                        partyId,
                    );
                    if(newPartyById != undefined){
                        getPartiesById.push(newPartyById);
                    }
                }
            }
            
            console.log("getPartiesById ", getPartiesById);
            response.data = getPartiesById;
            response.status = getPartiesById !== [] ? 200 : 404 ;
        }
        return response;
    } catch (error) {
      console.log('getPartiesFromMTU', error);
      response.data = error;
      response.status = 500;
      return response;
    } 
}