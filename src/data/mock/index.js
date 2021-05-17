import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';

const mock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet(/all-users/).reply(200, userMock);
  mock.onGet(/single-user/).reply(200, userMock.users[0]);
};

export default mock;
