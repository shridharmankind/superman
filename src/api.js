import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';
axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

export const client = axios.create();

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}
