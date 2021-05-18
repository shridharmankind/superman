import axios from 'axios';
import useMock from './data/mock';
import env from '../env.json';

const baseURL = env.API_HOST;

const client = axios.create({
  baseURL,
});

if (env.ENVIRONMENT === 'STATIC' && env.MOCK_REQUESTS === 'ALL') {
  useMock(client);
}

export const fetchAllUsers = () => {
  return client.get('/api/all-users');
};

export const fetchSingleUser = id => {
  return client.get(`/single-user?id=${id}`);
};

export const fetchWorkingDays = country => {
  return client.get(`/api/working-days?country=${country}`);
};
