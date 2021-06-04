/*
HTTP Status Code
Informational responses (100–199)
Successful responses (200–299)
Redirects (300–399)
Client errors (400–499)
Server errors (500–599)
*/

import {client} from '../../api';
import env from '../../../env.json';
import {KeyChain} from 'helper';

/*
Function to handle HTTP GET request
@params- for query params
*/
export const get = async (url, params = {}) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'GET',
    url,
    headers: {Authorization: `Bearer ${accessToken}`},
    params,
  };
  return client(config)
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
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };

  return client(config)
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

/**
 * Handle HTTP PUT request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const put = async (url, data = {}, params = {}) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'PUT',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };

  return client(config)
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

/**
 * Handle HTTP DELETE request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const Delete = async (url, data = {}, params = {}) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
    params,
  };

  return client(config)
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
  put,
  Delete,
};

export default NetworkService;
