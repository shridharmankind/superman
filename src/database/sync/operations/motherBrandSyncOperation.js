import {Operations, Constants} from 'database';

export class MotherBrandSyncOperations {
  constructor() {
    console.log('MotherBrandSyncOperations Created');
  }

  createNewRecord(dbInstance, schema, object) {
    return Operations.motherBrandOperations(dbInstance()).createSingleRecord(
      object,
    );
  }

  addModifiedRecord(dbInstance, schema, motherBrand) {
    let syncErrorDetailsObject = {
      conflictType: 'null',
      errorMessage: 'null',
    };
    const syncParametersObject = {
      devicePartyId: null,
      isActive: true,
      requireSync: false,
      lastModifiedOn: new Date(),
      isDeleted: false,
      errorInSync: false,
      syncErrorDetails: syncErrorDetailsObject,
    };
    try {
      const {molecule, motherBrandType} = motherBrand;
      let moleculeObject = {
        ...molecule,
        syncParameters:
          molecule.syncParametersObject === undefined
            ? syncParametersObject
            : molecule.syncParametersObject,
      };
      dbInstance().create(Constants.MOLECULES, moleculeObject, 'modified');
      let motherBrandTypeObject = {
        ...motherBrandType,
        syncParameters:
          motherBrandType.syncParametersObject === undefined
            ? syncParametersObject
            : motherBrandType.syncParametersObject,
      };
      dbInstance().create(
        Constants.MOTHER_BRAND_TYPE,
        motherBrandTypeObject,
        'modified',
      );
      dbInstance().create(
        Constants.MASTER_TABLE_MOTHER_BRAND,
        {
          ...motherBrand,
          syncParameters:
            motherBrand.syncParametersObject === undefined
              ? syncParametersObject
              : motherBrand.syncParametersObject,
        },
        'modified',
      );
    } catch (err) {
      console.log(err);
    }
  }
}
