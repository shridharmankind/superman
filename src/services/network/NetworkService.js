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
import {KeyChain, isWeb} from 'helper';
import {Offline} from 'database';
import NetInfo from '@react-native-community/netinfo';

const checkInternetConnectionForApp = async () => {
  return NetInfo.fetch().then(state => {
    if (!state.isConnected && !isWeb()) {
      return false;
    } else {
      return true;
    }
  });
};

const synchronizeDB = (response, config, apiPath) => {
  switch (config.method) {
    case 'DELETE':
      if (response.status == 200) {
        config.alreadyDeleted = true;
        Offline.offlineData(config, apiPath);
      }
      break;
    default:
      break;
  }
};

const getNetworkResponse = async (config, apiPath) => {
  return await client(config)
    .then(async function (response) {
      // handle success
      if (!isWeb()) {
        synchronizeDB(response, config, apiPath);
      }
      return response;
    })
    .catch(function (error) {
      console.log("err ",error);
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};


/*
Function to handle HTTP GET request
@params- for query params
*/
export const get = async (url, params = {}, apiPath = null) => {
  const accessToken = await KeyChain.getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: 'GET',
    url,
    headers: {Authorization: `Bearer ${accessToken}`},
    params,
  };
  const isConnectionAvailable = await checkInternetConnectionForApp();

  if (isConnectionAvailable) {
    return await getNetworkResponse(config, apiPath);
  } else {
    return await Offline.offlineData(config, apiPath);
  }
};

/*
Function to handle HTTP POST request
@data for passing data as body
@params- for query params
*/
export const post = async (url, data = {}, params = {}, apiPath = null) => {
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
  const isConnectionAvailable = await checkInternetConnectionForApp();

  if (isConnectionAvailable) {
    return await getNetworkResponse(config, apiPath);
  } else {
    return await Offline.offlineData(config, apiPath);
  }
};

/**
 * Handle HTTP PUT request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const put = async (url, data = {}, params = {}, apiPath = null) => {
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

  const isConnectionAvailable = await checkInternetConnectionForApp();

  if (isConnectionAvailable) {
    return await getNetworkResponse(config, apiPath);
  } else {
    return await Offline.offlineData(config, apiPath);
  }
};

/**
 * Handle HTTP DELETE request
 * @param {string} url http url of api
 * @param {object} data data to pass in body
 * @param {object} params params to pass in api call
 */
export const Delete = async (url, data = {}, params = {}, apiPath = null) => {
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

  const isConnectionAvailable = await checkInternetConnectionForApp();

  if (isConnectionAvailable) {
    return await getNetworkResponse(config, apiPath);
  } else {
    return await Offline.offlineData(config, apiPath);
  }
};

const NetworkService = {
  get,
  post,
  put,
  Delete,
};

export default NetworkService;
