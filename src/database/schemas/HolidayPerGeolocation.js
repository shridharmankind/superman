import {GeoLocationName} from './GeoLocation';
export const HolidayPerGeolocationName = 'HolidayPerGeolocation';
export default class HolidayPerGeolocationSchema {
  static schema = {
    name: HolidayPerGeolocationName,
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      description: 'string',
      date: 'date?',
      geoLocations: GeoLocationName,
    },
  };
}

// [
//     {
//     "id": 1539,
//     "name": "NEW YEARS DAY",
//     "description": "NEW YEARS DAY",
//     "date": "2021-01-01T00:00:00",
//     "geoLocations": [
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
//     {
//     "id": 13,
//     "name": "India",
//     "shortName": "India",
//     "geoLocationTypeId": 1,
//     "parentGeoLocationId": null,
//     "divisionId": 3,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     }
//     ]
//     },
//     {
//     "id": 1540,
//     "name": "GOOD FRIDAY",
//     "description": "GOOD FRIDAY",
//     "date": "2021-04-02T00:00:00",
//     "geoLocations": [
//     {
//     "id": 13,
//     "name": "India",
//     "shortName": "India",
//     "geoLocationTypeId": 1,
//     "parentGeoLocationId": null,
//     "divisionId": 3,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     },
//     {
//     "id": 16,
//     "name": "Delhi",
//     "shortName": "Delhi",
//     "geoLocationTypeId": 3,
//     "parentGeoLocationId": 24,
//     "divisionId": 2,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     },
//     {
//     "id": 15,
//     "name": "Noida Sector 8",
//     "shortName": "Sec 8",
//     "geoLocationTypeId": 7,
//     "parentGeoLocationId": 16,
//     "divisionId": 2,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     }
//     ]
//     },
//     {
//     "id": 1541,
//     "name": "EASTER MONDAY",
//     "description": "EASTER MONDAY",
//     "date": "2021-04-05T00:00:00",
//     "geoLocations": [
//     {
//     "id": 5,
//     "name": "Noida Sector 5",
//     "shortName": "Sec5",
//     "geoLocationTypeId": 7,
//     "parentGeoLocationId": 23,
//     "divisionId": 3,
//     "isActive": true,
//     "isDeleted": false,
//     "geoLocationConfiguration": null
//     }
//     ]
//     },
//     {
//     "id": 1542,
//     "name": "LABOUR DAY",
//     "description": "LABOUR DAY",
//     "date": "2021-05-01T00:00:00",
//     "geoLocations": []
//     },
//     {
//     "id": 1543,
//     "name": "EID AL-FITR",
//     "description": "EID AL-FITR",
//     "date": "2021-05-12T00:00:00",
//     "geoLocations": []
//     },
//     {
//     "id": 1544,
//     "name": "EID AL-FITR.",
//     "description": "EID AL-FITR.",
//     "date": "2021-05-13T00:00:00",
//     "geoLocations": []
//     },
//     {
//     "id": 1545,
//     "name": "MADARAKA DAY",
//     "description": "MADARAKA DAY",
//     "date": "2021-06-01T00:00:00",
//     "geoLocations": []
//     }
//     ]
