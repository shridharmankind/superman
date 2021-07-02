import * as Constants from '../constants';
import {SkuSchemaName} from '../schemas/Skus';
import {getAllTableRecords} from './common';
import {MotherBrands} from 'database';

export default dbInstance => ({
  storeSkus: async skus => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        skus.forEach(sku => {
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
            divisions,
          } = sku;

          const {moleculeId, motherBrandId, motherBrand} = subBrand;

          const subBrandData = dbInstance.create(
            Constants.MASTER_TABLE_SUB_BRAND,
            {
              id: subBrand.id,
              name: subBrand.name,
              shortName: subBrand.shortName,
              moleculeId,
              motherBrandId,
              isFocused: subBrand.isFocused,
              isPower: subBrand.isPower,
              motherBrand: MotherBrands.writeDataMapping([motherBrand], true),
            },
            'modified',
          );

          const divisionData = divisions?.forEach(division => {
            dbInstance.create(
              Constants.MASTER_TABLE_DIVISION,
              division,
              'modified',
            );
          });

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
              divisions: divisionData,
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
