import * as Constants from './../constants';
import * as Schemas from './../schemas';
import * as Helper from './../helper';
import * as Operations from './../operations';
import {NetworkService} from 'services';
import {KeyChain} from 'helper';
import party from './party.json';

const downloadStatus = Object.freeze({
    DOWNLOADED: 'DOWNLOADED',
    PENDING: 'PENDING',
});

export const fetchPreviouslyUpdatedData = async () => {
    await fetchData();
    return;
}

const fetchData = async () => {
    try {
        console.log("Running --- ",party);
        await Operations.createPartyMasterRecord(
            Helper.MASTER_TABLES_DETAILS[0].schema,
            JSON.parse(party),
            );
    } catch (error) {
    console.log('fetchData -- ', error);
    }
  };