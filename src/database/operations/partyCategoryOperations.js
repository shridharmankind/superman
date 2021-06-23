import {PartyCategorySchemaName} from '../schemas/PartyCategories';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storePartyCategories: async categories => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        categories.forEach(category => {
          const {id, name, divisionId, shortName, startAmount, endAmount} =
            category;
          dbInstance.create(
            PartyCategorySchemaName,
            {id, name, divisionId, shortName, startAmount, endAmount},
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
    return await categories.filtered(`categoryId = ${categoryId}`);
  },
});
