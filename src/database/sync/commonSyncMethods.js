import {PartyTableOperations,
    MonthlyTableOperations} from './operations';
import * as DBConstants from '../constants';

const SYNC_TASK_LIST = new Map();

export const getSyncTaskList = () => {
    /** Add Operation List here */
    if(SYNC_TASK_LIST.size <= 0){
        SYNC_TASK_LIST.set(DBConstants.MASTER_TABLE_PARTY, new PartyTableOperations());
        SYNC_TASK_LIST.set(DBConstants.MASTER_MONTHLY_TABLE_PLAN, new MonthlyTableOperations());
    }
    return SYNC_TASK_LIST;
}



export {SYNC_TASK_LIST};

