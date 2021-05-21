import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';

export const client = axios.create();

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}
