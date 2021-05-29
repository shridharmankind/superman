import * as Constants from './constants';

export const masterTablesDownLoadStatus = {
  name: Constants.MASTER_TABLES_DOWNLOAD_STATUS,
  properties: {
    name: 'string',
    status: 'string',
  },
  primaryKey: 'name',
};
