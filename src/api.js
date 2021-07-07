import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';
axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

export const client = axios.create();
client.defaults.timeout = env.API_TIMEOUT || 60000;

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}
