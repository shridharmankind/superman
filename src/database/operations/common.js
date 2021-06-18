import {Constants, getDBInstance} from 'database';

export const getAllTableRecords = async schemaName => {
  return await getDBInstance().objects(schemaName);
};

export const getActiveUser = async () => {
  const users = await getDBInstance().objects(Constants.MASTER_TABLE_USER_INFO);
  return users[0] || {};
};
