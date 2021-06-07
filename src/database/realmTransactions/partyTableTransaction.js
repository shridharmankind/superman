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
    return await fetchData();
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
                    const partyRecord = await Operations.getAllRecord(item.schema[0]);
                    //console.log("Party Record == ",JSON.stringify(partyRecord));
                    const modifiedData = partyRecord.filtered('syncParameters.isDeleted = true OR syncParameters.requireSync = true OR syncParameters.errorInSync = true')
                    console.log("modified -- ",JSON.stringify(modifiedData,null,2));
                    let newModifiedArray = Array.from(modifiedData);
                    let pushData = {
                        staffPositionId : 1,
                        lastSyncTime : record.lastSync,
                        syncPartyDtos : newModifiedArray
                    }
                    const response = await NetworkService.post('party/sync',pushData);
                    console.log("response--- ",JSON.parse(response.config.data).syncPartyDtos);
                    const data = await JSON.parse(response.config.data).syncPartyDtos;
                    console.log("new Data",JSON.stringify(data,null,2));
                    await Operations.updatePartyMasterRecord(item.schema[0],data);
                    const partyRecord1 = await Operations.getAllRecord(item.schema[0]);
                    console.log("Iupdated == ",JSON.stringify(partyRecord1,null,2));
                    
                    await Operations.updateRecord(
                        Schemas.masterTablesDownLoadStatus,
                        downloadStatus.DOWNLOADED,
                        item.name,
                    );

                    return;
                }
                
                
            }
        });
        return "SUCCESS";
    } catch (error) {
    console.log('fetchData -- ', error);
    }
  };