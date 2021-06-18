import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';
import {isWeb} from 'helper';
import NetInfo from "@react-native-community/netinfo";
axios.defaults.headers ={
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
}


export const client = axios.create();

client.interceptors.request.use(
  (config) => {
    if(!isWeb()){
      //console.log("Before config - ",config);
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if(!state.isConnected){
          console.log("Not connected work");
        }
      });
    }
    else{
      console.log("It is web");
    }
    
    return config;
  },
  (error) => {
  // Do something with request error
  return Promise.reject(error);
});


client.interceptors.response.use(
  (config) => {
    if(!isWeb()){
      //console.log("After config - ",config);
    }
    else{
      console.log("It is web");
    }
    
    return config;
  },
  (error) => {
  // Do something with request error
  return Promise.reject(error);
});



if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}
