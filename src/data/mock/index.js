import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import patchesMock from './api/patches.json';
import areaList from './api/areaList.json';
import party from './api/party.json';
import tourPlanMock from './api/tourPlan.json';
import {workingDay} from 'screens/tourPlan/apiPath';
import userInfo from './api/userInfo.json';

import {partiesMock} from './api/parties.js';
import {API_PATH} from 'screens/tour-plan/apiPath';
import {API_PATH as DIRECTORY_APIS} from 'screens/directory/apiPath';
import visitMockData from './api/timeline.json';

const getPartiesUrl = () => {
  const valueMap = {
    staffpositionid: 2,
    monthVal: 5,
    yearVal: 2021,
    dayVal: 5,
  };
  let url = API_PATH.GET_PARTIES;
  url = url.replace(
    /\b(?:staffpositionid|monthVal|yearVal|dayVal)\b/gi,
    matched => valueMap[matched],
  );

  return url;
};

const getDeletePartyUrl = () => {
  const valueMap = {
    staffpositionid: 2,
    partyid: 1,
  };
  let url = API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN;
  url = url.replace(
    /\b(?:staffpositionid|partyid)\b/gi,
    matched => valueMap[matched],
  );

  return url;
};

const getMock = axios => {
  const mock = new MockAdapter(axios);

  mock.onGet('/all-users').reply(200, userMock);
  mock.onGet('/single-user').reply(200, userMock.users[0]);
  mock.onGet(`${API_PATH.WORKING_DAY}/1`).reply(200, stpMock);
  mock.onGet('/api/Chemists').reply(200, userMock);
  mock.onGet(`${API_PATH.PATCH}/1`).reply(200, patchesMock.getPatches);
  mock.onGet('/deletePatch/1').reply(200, patchesMock.deletePatch);
  mock.onPost(`${API_PATH.PATCH}/1`).reply(200, patchesMock.savePatch.response);
  mock.onPut(`${API_PATH.PATCH}/1`).reply(200, patchesMock.savePatch.response);
  mock.onGet(`${API_PATH.AREA_BY_SPID}/1`).reply(200, areaList);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
  mock.onGet('user/me').reply(200, userInfo);
  mock.onGet('Party/partyBySpId/1').reply(200, party);
  mock
    .onGet(`${API_PATH.PATCH}/1/parties`)
    .reply(200, patchesMock.getPartyByPatchId);
  mock
    .onPost(`${API_PATH.PATCH}/validate/1`)
    .reply(200, patchesMock.validate.response);
  mock.onGet(getPartiesUrl()).reply(200, partiesMock.getParties.response);
  mock.onDelete(getDeletePartyUrl()).reply(200, true);
  mock
    .onGet(
      `${DIRECTORY_APIS.GET_TIMELINE}?StaffPositionId=2&PartyId=1&StartDate=2021-04-01&EndDate=2021-06-30`,
    )
    .reply(200, visitMockData);
};

export default getMock;
