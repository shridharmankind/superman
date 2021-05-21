import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import tourPlanMock from './api/tourPlan.json';

const getMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet('/all-users').reply(200, userMock);
  mock.onGet('/single-user').reply(200, userMock.users[0]);
  mock.onGet('/api/workingDays').reply(200, stpMock.workingDays);
  mock.onGet('/api/Chemists').reply(200, userMock);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
};

export default getMock;
