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
                if (record?.status === downloadStatus.DOWNLOADED) {
                    const partyRecord = await Operations.getAllRecord(item.schema[0]);
                    console.log("Party Record == ",partyRecord);
                    //const modifiedData = partyRecord.filtered('action != "SYNC"')
                    //console.log("Not Sync Data ",modifiedData);
                    return;
                }
                // const response = await NetworkService.get(item.apiPath);
                // const data = await JSON.stringify(response.data);
                // await Operations.createPartyMasterRecord(
                //     item.schema,
                //     JSON.parse(data),
                // );
                
                // await Operations.updateRecord(
                //     Schemas.masterTablesDownLoadStatus,
                //     downloadStatus.DOWNLOADED,
                //     item.name,
                // );
                
            }
        });
        return "SUCCESS";
    } catch (error) {
    console.log('fetchData -- ', error);
    }
  };