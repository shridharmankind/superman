/*
HTTP Status Code
Informational responses (100–199)
Successful responses (200–299)
Redirects (300–399)
Client errors (400–499)
Server errors (500–599)
*/

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../../../env.json';

/*
Function to handle HTTP GET request
@params- for query params
*/
export const get = async (url, params = {}) => {
  const authCode = await AsyncStorage.getItem('Auth');
  const config = {
    baseURL: env.API_HOST,
    method: 'GET',
    url,
    headers: {Authorization: authCode},
    params,
  };

  return axios(config)
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

/*
Function to handle HTTP POST request
@data for passing data as body
@params- for query params
*/
export const post = async (url, data = {}, params = {}) => {
  const authCode = await AsyncStorage.getItem('Auth');
  const config = {
    baseURL: env.API_HOST,
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authCode,
    },
    data,
    params,
  };

  return axios(config)
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

const NetworkService = {
  get,
  post,
};

export default NetworkService;
