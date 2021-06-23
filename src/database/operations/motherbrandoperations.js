import {MotherBrandSchemaName} from '../schemas/Motherbrands';
import {getAllTableRecords} from './common';
import * as Constants from '../constants';

export default dbInstance => ({
  storeMotherBrands: async motherBrands => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        motherBrands.forEach(motherBrand => {
          console.log('motherbrand', motherBrand);
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
            Constants.MOTHER_BRAND,
            molecule,
            'modified',
          );
          const motherBrandTypeChild = dbInstance.create(
            Constants.MOTHER_BRAND_TYPE,
            motherBrandType,
            'modified',
          );
          dbInstance.create(
            MotherBrandSchemaName,
            {
              id,
              name,
              shortName,
              isFocused,
              isPower,
              molecule: moleculeChild,
              motherBrandType: motherBrandTypeChild,
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
    return await getAllTableRecords(MotherBrandSchemaName);
  },

  getMotherBrandById: async motherBrandId => {
    const motherBrands = await getAllTableRecords(MotherBrandSchemaName);
    return motherBrands.filtered(`id = ${motherBrandId}`);
  },
});
