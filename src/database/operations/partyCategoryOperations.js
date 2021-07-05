import {PartyCategorySchemaName} from '../schemas/PartyCategories';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storePartyCategories: async categories => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        categories.forEach(category => {
          dbInstance.create(
            PartyCategorySchemaName,
            {...category, syncParameters: syncParametersObject()},
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllPartyCategories: async () => {
    return await getAllTableRecords(PartyCategorySchemaName);
  },

  getPartyCategory: async id => {
    return await dbInstance.objectForPrimaryKey(PartyCategorySchemaName, id);
  },
  getPartyCategoryById: async categoryId => {
    const categories = await getAllTableRecords(PartyCategorySchemaName);
    return categories.filtered(`partyCategoryId = ${categoryId}`);
  },
  createSingleRecord: category => {
    let recordsUpdated = true;
    try {
      let syncParameters =
        category.syncParameters === undefined
          ? syncParametersObject()
          : category.syncParameters;
      dbInstance.create(
        PartyCategorySchemaName,
        {...category, syncParameters},
        'modified',
      );
    } catch (err) {
      console.log(err);
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
});
