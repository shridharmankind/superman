import * as Constants from '../constants';
import {SkuSchemaName} from '../schemas/Skus';
import {getAllTableRecords, syncParametersObject} from './common';
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
              syncParameters: syncParametersObject(),
            },
            'modified',
          );

          let parent = dbInstance.create(
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
              syncParameters: syncParametersObject(),
            },
            'modified',
          );

          divisions.forEach(division => {
            let syncParameters =
              division.syncParameters === undefined
                ? syncParametersObject()
                : division.syncParameters;
            let child = dbInstance.create(
              Constants.MASTER_TABLE_DIVISION,
              {
                ...division,
                syncParameters,
              },
              'modified',
            );
            parent.divisions.push(child);
          });
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
  createSingleRecord: sku => {
    let recordsUpdated = true;
    try {
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
          syncParameters: syncParametersObject(),
        },
        'modified',
      );

      let parent = dbInstance.create(
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
          syncParameters: syncParametersObject(),
        },
        'modified',
      );
      divisions.forEach(division => {
        let syncParameters =
          division.syncParameters === undefined
            ? syncParametersObject()
            : division.syncParameters;
        let child = dbInstance.create(
          Constants.MASTER_TABLE_DIVISION,
          {
            ...division,
            syncParameters,
          },
          'modified',
        );
        parent.divisions.push(child);
      });
    } catch (err) {
      console.log(err);
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
});
