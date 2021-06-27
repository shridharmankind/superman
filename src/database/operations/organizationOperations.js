import {OrganizationSchemaName} from '../schemas/Organizations';
import {getAllTableRecords, syncParametersObject} from './common';

export default dbInstance => ({
  storeOrganizations: async organizations => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        organizations.forEach(organization => {
          const {id, name, shortName} = organization;
          let syncParameters = organization.syncParameters == undefined ? syncParametersObject(): organization.syncParameters;
          dbInstance.create(
            OrganizationSchemaName,
            {id, name, shortName, syncParameters},
            'modified',
          );
        });
      });
    } catch (err) {
      recordsUpdated = false;
    }
    return recordsUpdated;
  },

  getAllOrganizations: async () => {
    return await getAllTableRecords(OrganizationSchemaName);
  },

  getOrganizationById: async organizationId => {
    const organizations = await getAllTableRecords(OrganizationSchemaName);
    return organizations.filtered(`id = ${organizationId}`);
  },
});
