import * as Constants from '../constants';
import * as Schemas from '../schemas';
import * as Helper from '../helper';
import * as Operations from '../operations';
import {NetworkService} from 'services';
import {KeyChain} from 'helper';

const downloadStatus = Object.freeze({
    DOWNLOADED: 'DOWNLOADED',
    PENDING: 'PENDING',
});

export const fetchPreviouslyUpdatedData = async () => {
    try{
        //return await fetchData();
        return true;
    }
    catch(err){
        console.log("Error ",err);
    }
}

/**
 * 
 * @returns true : success
 * @returns false: failure
 */
const fetchData = async () => {
    try {
        console.log("start");
        let item = await Helper.MASTER_TABLES_DETAILS.filter(obj => {
            return obj.name === Constants.MASTER_TABLE_PARTY
        })
        console.log(item);
        if (item[0].name === Constants.MASTER_TABLE_PARTY) {
            const record = await Operations.getRecord(
                Schemas.masterTablesDownLoadStatus,
                item[0].name,
            );
            if (record?.status === downloadStatus.DOWNLOADED) {
                const accessToken = await KeyChain.getAccessToken();
                console.log("accessTokenn -- ",accessToken);
                //await Operations.insertPartyTableData(Helper.MASTER_TABLES_DETAILS[1].schema,-2)
                const partyRecord = await Operations.getAllRecord(item[0].schema[0]);
                //console.log("Party Record == ",JSON.stringify(partyRecord,null,2));
                const modifiedData = partyRecord.filtered('syncParameters.isDeleted = true OR syncParameters.requireSync = true OR syncParameters.errorInSync = true')
                //console.log("modified -- ",JSON.stringify(modifiedData,null,2));
                
                let newModifiedArray = Array.from(modifiedData);
                
                const staffPositionId = await Helper.getStaffPositionId();
                let pushData = {
                    staffPositionId : staffPositionId,
                    lastSyncTime : record.lastSync,
                    syncPartyDtos : newModifiedArray
                }
                const response = await NetworkService.post('party/sync',pushData);
                //console.log("response--- ",response?.status);
                if (response?.status === Constants.HTTP_OK) {
                    if(await Operations.updatePartyMasterRecord(item[0].schema,response.data))
                    {
                        const partyRecord1 = await Operations.getAllRecord(item[0].schema[0]);
                        //console.log("Iupdated == ",JSON.stringify(partyRecord1,null,2));
                        
                        await Operations.updateRecord(
                            Schemas.masterTablesDownLoadStatus,
                            downloadStatus.DOWNLOADED,
                            item[0].name
                        );
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        return false;
        
    } catch (error) {
        console.log('fetchData -- ', error);
        return false
    }
  };