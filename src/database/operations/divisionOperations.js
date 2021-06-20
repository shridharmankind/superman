import * as Constants from '../constants';
import {DivisionSchemaName} from '../schemas/Divisions';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeDivisions: async divisions => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        divisions.forEach(division => {
          const {designations, geoLocations, staffPositions} = division;
          const parentData = {
            id: division.id,
            name: division.name,
            shortName: division.shortName,
            maxPatchCount: division.maxPatchCount,
            kycPartyLimit: division.kycPartyLimit,
          };
          let divisionParent = dbInstance.create(
            DivisionSchemaName,
            parentData,
            'modified',
          );
          // map staff designation
          designations?.forEach(designation => {
            const desigChild = dbInstance.create(
              Constants.MASTER_TABLE_STAFF_DESIGNATION,
              designation,
              'modified',
            );
            divisionParent.designations.push(desigChild);
          });

          // map staff positions
          staffPositions?.forEach(staffPosition => {
            const staffChild = dbInstance.create(
              Constants.MASTER_TABLE_STAFF_POSITIONS,
              staffPosition,
              'modified',
            );
            divisionParent.staffPositions.push(staffChild);
          });

          // map geolocation
          geoLocations?.forEach(geoLocation => {
            const {
              id,
              name,
              shortName,
              geoLocationTypeId,
              parentGeoLocationId,
              divisionId,
              isActive,
              isDeleted,
              geoLocationConfiguration,
            } = geoLocation;
            const configuration = dbInstance.create(
              Constants.MASTER_TABLE_GEOLOCATIONS_CONFIGURATION,
              geoLocationConfiguration,
              'modified',
            );

            const geoChild = dbInstance.create(
              Constants.MASTER_TABLE_GEOLOCATIONS,
              {
                id: id,
                name: name,
                shortName: shortName,
                geoLocationTypeId: geoLocationTypeId,
                parentGeoLocationId: parentGeoLocationId,
                divisionId: divisionId,
                isActive: isActive,
                isDeleted: isDeleted,
                geoLocationConfiguration: configuration,
              },
              'modified',
            );
            divisionParent.geoLocations.push(geoChild);
          });
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllDivisions: async () => {
    return await getAllTableRecords(DivisionSchemaName);
  },

  getDivisionById: async divisionId => {
    const divisions = await getAllTableRecords(DivisionSchemaName);
    return divisions.filtered(`id = ${divisionId}`);
  },
});
