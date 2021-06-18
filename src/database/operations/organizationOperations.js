import {OrganizationSchemaName} from '../schemas/Organizations';
import {getAllTableRecords} from './common';

export default dbInstance => ({
  storeOrganizations: async organizations => {
    let recordsUpdated = true;
    try {
      await dbInstance.write(() => {
        organizations.forEach(organization => {
          dbInstance.create(OrganizationSchemaName, organization, 'modified');
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
