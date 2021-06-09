import * as Constants from './../constants';
import * as Schemas from './../schemas';
import * as Helper from './../helper';
import * as Operations from './../operations';
import {NetworkService} from 'services';
import {KeyChain} from 'helper';
import party from './../../data/mock/api/party.json';

const downloadStatus = Object.freeze({
    DOWNLOADED: 'DOWNLOADED',
    PENDING: 'PENDING',
});

export const fetchPreviouslyUpdatedData = async () => {
    //return await fetchData();
    return;
}

export const initMasterTablesDownloadStatus = async () => {
    try {
        Helper.MASTER_TABLES_DETAILS.forEach(async item => {
            await Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
                name: item.name,
                status: downloadStatus.PENDING,
            });
        });
    } catch (error) {
      console.log('initMasterTablesDownloadStatus', error);
    }
};

const fetchData = async () => {
    try {
        await Helper.MASTER_TABLES_DETAILS.forEach(async item => {
            if (item.name === Constants.MASTER_TABLE_PARTY) {
                const record = await Operations.getRecord(
                    Schemas.masterTablesDownLoadStatus,
                    item.name,
                );
                console.log("record master : ",record);
                if (record?.status === downloadStatus.DOWNLOADED) {
                    const accessToken = await KeyChain.getAccessToken();
                    //console.log("accessTokenn -- ",accessToken);
                    //await Operations.insertPartyTableData(Helper.MASTER_TABLES_DETAILS[1].schema,-2)
                    const partyRecord = await Operations.getAllRecord(item.schema[0]);
                    //console.log("Party Record == ",JSON.stringify(partyRecord,null,2));
                    const modifiedData = partyRecord.filtered('syncParameters.isDeleted = true OR syncParameters.requireSync = true OR syncParameters.errorInSync = true')
                    console.log("modified -- ",JSON.stringify(modifiedData,null,2));
                    
                    let newModifiedArray = Array.from(modifiedData);
                    
                    const staffPositionId = await Helper.getStaffPositionId();
                    let pushData = {
                        staffPositionId : staffPositionId,
                        lastSyncTime : record.lastSync,
                        syncPartyDtos : newModifiedArray
                    }
                    const response = await NetworkService.post('party/sync',pushData);
                    //console.log("response--- ",JSON.stringify(response));
                    const data = await response.data;
                    //console.log("new Data",JSON.stringify(data,null,2));
                    await Operations.updatePartyMasterRecord(item.schema,data);
                    const partyRecord1 = await Operations.getAllRecord(item.schema[0]);
                    console.log("Iupdated == ",JSON.stringify(partyRecord1,null,2));
                    
                    await Operations.updateRecord(
                        Schemas.masterTablesDownLoadStatus,
                        downloadStatus.DOWNLOADED,
                        item.name
                    );


                    const record1 = await Operations.getRecord(
                        Schemas.masterTablesDownLoadStatus,
                        item.name,
                    );
                    //console.log("record master : ",record1);
                    return;
                }
                
                
            }
        });
        return "SUCCESS";
    } catch (error) {
    console.log('fetchData -- ', error);
    }
  };