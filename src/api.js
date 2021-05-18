import axios from 'axios';
import getMock from './data/mock';
import env from '../env.json';

const baseURL = env.API_HOST;

const client = axios.create({
  baseURL,
});

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  getMock(client);
}

export const fetchAllUsers = () => {
  return client.get('/all-users');
};

export const fetchSingleUser = id => {
  return client.get(`/single-user?id=${id}`);
};
