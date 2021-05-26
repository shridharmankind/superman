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
  // const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpSY080bnhzNWpnYzhZZE43STJoTE80Vl9xbDFiZG9pTVhtY1lnSG00SHMifQ.eyJqdGkiOiI3TEpHTGtjVmt-SXZPQ1paRWFMazciLCJzdWIiOiIxMzM4NzQzMzgiLCJpc3MiOiJodHRwczovL3N1cGVybWFuLWRldi5vbmVsb2dpbi5jb20vb2lkYy8yIiwiaWF0IjoxNjIxNTA2NTg1LCJleHAiOjE2MzcwNTg1ODUsInNjb3BlIjoib3BlbmlkIiwiYXVkIjoiNzAyZTc4NzAtOGJlNi0wMTM5LTJmZmItMDY1YzAxZDBhMjNkMTg5Mjk2In0.hq5q5_ggP1c_WyM3tJDEsfrMP7K7C_fCxMyyPa9sKXC4YE62XY3_v9HQPkf1bJgkZ1a0-wKfkG58T-09Gs_lJdnvgt9f-z9v89lNP1pkZzvRo_9qnnq0O8NkyaTF0u1ZGjcyQl_ybNOLe0xJZE3IfaYlKF4dcA10A-09F1_PwuIy3rw9GV4pkryAdiOX1HIiAeUXlHsapiBpYd2qPbinyR9ovjdwq9Akb5XhN2TQTa-mgKVmzWyVBPrRqzqt9IibwjvlNc5-wyDXT9b6Tz8jp1Ubs4pF_3d4ZNgNT8l5uat8gGau16ZtB3fuJ08FYAzz2fq-wdt829XZF-Mv2HJEBQ';
  console.log('access', accessToken);
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
  console.log('in n/w service');

  return client(config)
    .then(function (response) {
      console.log('response in n/w', response);
      // handle success
      return response;
    })
    .catch(function (error) {
      console.log('in errror', error);
      // handle error, based on different error code different error message can be set here
      return error.response || error.message;
    });
};

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

const NetworkService = {
  get,
  post,
  put,
};

export default NetworkService;
