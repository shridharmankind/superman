import {MotherBrandsSchemaName} from '../schemas/MotherBrands';
import {getAllTableRecords, syncParametersObject} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeMotherBrands: async motherBrands => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
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
          dbInstance.create(
            MotherBrandsSchemaName,
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
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllMotherBrands: async () => {
    return await getAllTableRecords(MotherBrandsSchemaName);
  },

  getMotherBrandById: async motherBrandId => {
    const motherBrands = await getAllTableRecords(MotherBrandsSchemaName);
    return motherBrands.filtered(`id = ${motherBrandId}`);
  },
});
