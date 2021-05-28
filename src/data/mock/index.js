import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import patchesMock from './api/patches.json';
import areaList from './api/areaList.json';
import party from './api/party.json';
import tourPlanMock from './api/tourPlan.json';
import {API_PATH} from 'screens/tourPlan/apiPath';
const getMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet('/all-users').reply(200, userMock);
  mock.onGet('/single-user').reply(200, userMock.users[0]);
  mock.onGet(`${API_PATH.WORKING_DAY}/1`).reply(200, stpMock);
  mock.onGet('/api/Chemists').reply(200, userMock);
  mock.onGet('/getPatches/1').reply(200, patchesMock.getPatches);
  mock.onGet('/deletePatch/1').reply(200, patchesMock.deletePatch);
  mock
    .onPost('/patch/1', patchesMock.savePatch.request)
    .reply(200, patchesMock.savePatch.response);
  mock
    .onPut('/patch/1', patchesMock.updatePatch)
    .reply(200, patchesMock.savePatch.response);
  mock.onGet('/area/1').reply(200, areaList);
  mock.onGet('/party/1').reply(200, party);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
  mock
    .onGet('/party/partybyspid/1/1')
    .reply(200, patchesMock.getPartyByPatchId);
  mock.onGet('/patch/validate/1').reply(200, patchesMock.validate.request);
};

export default getMock;
