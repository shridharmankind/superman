import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import patchesMock from './api/patches.json';
import areaList from './api/areaList.json';
import party from './api/party.json';
import tourPlanMock from './api/tourPlan.json';
import partiesMock from './api/parties.json';
import {API_PATH} from 'screens/tourPlan/apiPath';
const getMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet('/all-users').reply(200, userMock);
  mock.onGet('/single-user').reply(200, userMock.users[0]);
  mock.onGet(`${API_PATH.WORKING_DAY}/1`).reply(200, stpMock);
  mock.onGet('/api/Chemists').reply(200, userMock);
  mock.onGet(`${API_PATH.PATCH}/1`).reply(200, patchesMock.getPatches);
  mock.onGet('/deletePatch/1').reply(200, patchesMock.deletePatch);
  mock
    .onPost(`${API_PATH.PATCH}/1`, patchesMock.savePatch.request)
    .reply(200, patchesMock.savePatch.response);
  mock
    .onPut(`${API_PATH.PATCH}/1`, patchesMock.savePatch.request)
    .reply(200, patchesMock.savePatch.response);
  mock.onGet(`${API_PATH.AREA_BY_SPID}/1`).reply(200, areaList);
  mock.onGet(`${API_PATH.PARTY_BY_SPID}/1`).reply(200, party);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
  mock
    .onGet(`${API_PATH.PATCH}/1/parties`)
    .reply(200, patchesMock.getPartyByPatchId);
  mock
    .onPost(`${API_PATH.PATCH}/validate/1`, patchesMock.validate.request)
    .reply(200, patchesMock.validate.response);
  mock
    .onPost(`${API_PATH.GET_PARTIES}`, partiesMock.getParties.request)
    .reply(200, partiesMock.getParties.response);
  mock
    .onGet(`${API_PATH.GET_PARTIES}`)
    .reply(200, partiesMock.getParties.response);
};

export default getMock;
