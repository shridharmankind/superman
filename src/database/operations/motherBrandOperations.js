import {MotherBrandsSchemaName} from '../schemas/MotherBrands';
import {getAllTableRecords, syncParametersObject} from './common';
import * as Constants from '../constants';
import {MotherBrands} from 'database';

export default dbInstance => ({
  storeMotherBrands: async motherBrands => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        MotherBrands.writeDataMapping(motherBrands, dbInstance);
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
  createSingleRecord: (motherBrand, toBeReturn = false) => {
    let recordsUpdated = true;
    let data;
    try {
      const {molecule, motherBrandType} = motherBrand;
      let moleculeObject = {
        ...molecule,
        syncParameters: syncParametersObject(),
      };
      dbInstance.create(Constants.MOLECULES, moleculeObject, 'modified');
      let motherBrandTypeObject = {
        ...motherBrandType,
        syncParameters: syncParametersObject(),
      };
      dbInstance.create(
        Constants.MOTHER_BRAND_TYPE,
        motherBrandTypeObject,
        'modified',
      );
      data = dbInstance.create(
        Constants.MASTER_TABLE_MOTHER_BRAND,
        {
          ...motherBrand,
          syncParameters: syncParametersObject(),
        },
        'modified',
      );
      // Need to pass single object for SKU operations
      // For mapping under sub_brand
      if (toBeReturn) {
        return data;
      }
    } catch (err) {
      console.log(err);
      recordsUpdated = false;
    }
    return recordsUpdated;
  },
  // Re-usable for SUB_BRAND
  writeDataMapping: (motherBrands, toBeReturn = false) => {
    let data;
    motherBrands.forEach(motherBrand => {
      const {
        id,
        name,
        shortName,
        isFocused,
        isPower,
        molecule,
        motherBrandType,
      } = motherBrand;
      const moleculeChild = dbInstance.create(
        Constants.MOLECULES,
        {...molecule, syncParameters: syncParametersObject()},
        'modified',
      );
      const motherBrandTypeChild = dbInstance.create(
        Constants.MOTHER_BRAND_TYPE,
        {...motherBrandType, syncParameters: syncParametersObject()},
        'modified',
      );
      data = dbInstance.create(
        Constants.MASTER_TABLE_MOTHER_BRAND,
        {
          id,
          name,
          shortName,
          isFocused,
          isPower,
          molecule: moleculeChild,
          motherBrandType: motherBrandTypeChild,
          syncParameters: syncParametersObject(),
        },
        'modified',
      );
    });

    // Need to pass single object for SKU operations
    // For mapping under sub_brand
    if (toBeReturn) {
      return data;
    }
  },

  getAllMotherBrands: async () => {
    return await getAllTableRecords(MotherBrandsSchemaName);
  },

  getMotherBrandById: async motherBrandId => {
    const motherBrands = await getAllTableRecords(MotherBrandsSchemaName);
    return motherBrands.filtered(`id = ${motherBrandId}`);
  },
});
