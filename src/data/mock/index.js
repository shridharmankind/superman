import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';

const useMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet(/all-users/).reply(200, userMock);
  mock.onGet(/single-user/).reply(200, userMock.users[0]);
  mock.onGet(/working-days/).reply(200, stpMock.workingDays);
};

export default useMock;
