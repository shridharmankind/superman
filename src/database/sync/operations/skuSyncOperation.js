import {Operations, Constants, MotherBrands} from 'database';
export class SkuSyncOperations {
  constructor() {
    console.log('SkuSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.skuOperations(dbInstance()).createSingleRecord(object);
  }

  addModifiedRecord(dbInstance, schema, sku) {
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
      const subBrandData = dbInstance().create(
        Constants.MASTER_TABLE_SUB_BRAND,
        {
          id: subBrand.id,
          name: subBrand.name,
          shortName: subBrand.shortName,
          moleculeId,
          motherBrandId,
          isFocused: subBrand.isFocused,
          isPower: subBrand.isPower,
          motherBrand: MotherBrands.createSingleRecord(motherBrand, true),
          syncParameters:
            subBrand.syncParameters === undefined
              ? Operations.syncParametersObject()
              : subBrand.syncParameters,
        },
        'modified',
      );

      let parent = dbInstance().create(
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
          syncParameters:
            sku.syncParameters === undefined
              ? Operations.syncParametersObject()
              : sku.syncParameters,
        },
        'modified',
      );
      divisions.forEach(division => {
        let syncParameters =
          division.syncParameters === undefined
            ? Operations.syncParametersObject()
            : division.syncParameters;
        let child = dbInstance().create(
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
      console.log('addModifiedRecord ', err);
    }
  }
}
