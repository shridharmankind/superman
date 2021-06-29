export const GeoLocationName = 'GeoLocation';
export default class GeoLocationSchema {
  static schema = {
    name: GeoLocationName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      shortName: 'string',
      geoLocationTypeId: 'int',
      parentGeoLocationId: 'int',
      divisionId: 'int',
    },
  };
}

//     {
//     "id": 1,
//     "name": "Noida Sector 1",
//     "shortName": "Sec 1",
//     "geoLocationTypeId": 7,
//     "parentGeoLocationId": 16,
//     "divisionId": 2,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     },
