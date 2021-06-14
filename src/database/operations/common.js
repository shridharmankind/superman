import {getDBInstance} from 'database';

export const getAllTableRecords = async schemaName => {
  return await getDBInstance().objects(schemaName);
};
