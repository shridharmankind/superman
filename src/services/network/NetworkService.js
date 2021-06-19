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
import {KeyChain,isWeb} from 'helper';
import {Offline} from 'database';
import NetInfo from '@react-native-community/netinfo';

// client.interceptors.request.use(
//   config => {
//     if (!isWeb()) {
//       console.log("Before config - ",config);
//       NetInfo.fetch().then(state => {
//         if (!state.isConnected) {
//           console.log('Not connected work');
          
//         }
//         else{
//           //return config;
//         }
//       });
//     } else {
//       console.log('It is web');
//       return config;
//     }
//     console.log("ebfore configured -- ",config);
//     return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// client.interceptors.response.use(
//   config => {
//     if (!isWeb()) {
//       console.log("After config - ",config);
//       //return config;
//     } else {
//       console.log('It is web',config);
//       //return config;
//     }
//      console.log("after config ------ ",config);
//      return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );


const checkInternetConnectionForApp = async () => {
  return NetInfo.fetch().then(state => {
    if (!state.isConnected && !isWeb()) {
      console.log('Not connected work');
      return false;
    }
    else{
      console.log("connected and web");
      return true;
    }
  });
}

const getNetworkResponse = async (config) => {
  console.log("getNetork response");
  return await client(config)
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      console.log(error);
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
}

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
  console.log("again called");
  const isConnectionAvailable = await checkInternetConnectionForApp();

  if(isConnectionAvailable){
    console.log("ConnectionAvailable in call");
    return await getNetworkResponse(config);
  }
  else{
    console.log("Connection Not Avaibale in call ");
    console.log("Api Path ",apiPath);
    return await Offline.offlineData(config, apiPath);
  }
  
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

  return await client(config)
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

  return await client(config)
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
