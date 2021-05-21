import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import patchesMock from './api/patches.json';

const getMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet('/all-users').reply(200, userMock);
  mock.onGet('/single-user').reply(200, userMock.users[0]);
  mock.onGet('/working-days').reply(200, stpMock.workingDays);
  mock.onGet('/api/Chemists').reply(200, userMock);
  mock.onGet('/getPatches/1').reply(200, patchesMock.getPatches);
  mock.onGet('/deletePatch/1').reply(200, patchesMock.deletePatch);
  mock
    .onPost('/savePatch', patchesMock.savePatch.request)
    .reply(200, patchesMock.savePatch.response);
  mock
    .onPut('/updatePatch', patchesMock.updatePatch)
    .reply(200, patchesMock.updatePatch);
};

export default getMock;
