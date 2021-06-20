import * as Constants from '../constants';
import {SkuSchemaName} from '../schemas/Skus';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeSkus: async skus => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        skus?.forEach(sku => {
          const {
            id,
            name,
            shortName,
            description,
            maximumRetailPrice,
            priceToStockist,
            isFocused,
            isPower,
            isSample,
            subBrand,
          } = sku;
          const subBrandData = dbInstance.create(
            Constants.MASTER_TABLE_SUBBRAND,
            subBrand,
            'modified',
          );

          dbInstance.create(
            Constants.MASTER_TABLE_SKU,
            {
              id,
              name,
              shortName,
              description,
              maximumRetailPrice,
              priceToStockist,
              isFocused,
              isPower,
              isSample,
              subBrand: subBrandData,
            },
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllSkus: async () => {
    return await getAllTableRecords(SkuSchemaName);
  },

  getSkuById: async skuId => {
    const sku = await getAllTableRecords(SkuSchemaName);
    return sku.filtered(`id = ${skuId}`);
  },
});
