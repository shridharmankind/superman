export const MotherbrandsSchemaName = 'Motherbrands';

export default class MotherbrandsSchema {
  static schema = {
    name: MotherbrandsSchemaName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      isFocused: 'bool',
      isPower: 'bool',
      molecule: 'Molecule',
      motherBrandType: 'MotherbrandType',
    },
  };
}

// {
//     "id": 1,
//     "name": "Alzone",
//     "shortName": "Alzone",
//     "isFocused": true,
//     "isPower": true,
//     "molecule": {
//       "id": 1,
//       "name": "Molecule-1",
//       "shortName": "M1"
//     },
//     "motherBrandType": {
//       "id": 2,
//       "name": "MType-2",
//       "shortName": "M2"
//     }
//   },
//   {
//     "id": 2,
//     "name": "Zinco",
//     "shortName": "Zinco",
//     "isFocused": true,
//     "isPower": true,
//     "molecule": {
//       "id": 2,
//       "name": "Molecule-2",
//       "shortName": "M2"
//     },
//     "motherBrandType": {
//       "id": 1,
//       "name": "MType-1",
//       "shortName": "M1"
//     }
//   }
