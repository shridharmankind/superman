import MockAdapter from 'axios-mock-adapter';
import userMock from './api/doctors.json';
import stpMock from './api/standardTourPlan.json';
import patchesMock from './api/patches.json';
import areaList from './api/areaList.json';
import taskList from './api/tasks.json';
import party from './api/party.json';
import tourPlanMock from './api/tourPlan.json';
import product from './api/priorityProduct.json';
import userInfo from './api/userInfo.json';
import {getFormatDate} from 'utils/dateTimeHelper';
import planComplaince from './api/planComplaince.json';
import docList from './api/searchDocList.json';

import {partiesMock} from './api/parties.js';
import {API_PATH} from 'screens/tour-plan/apiPath';
import stpData from './api/stpData.js';
import stpStatus from './api/stpStatus.json';
import submitStpMock from './api/submitStp.json';


const getPartiesUrl = () => {
  const valueMap = {
    staffpositionid: 2,
    monthVal: parseInt(getFormatDate({format: 'M'}), 10),
    yearVal: parseInt(getFormatDate({format: 'YYYY'}), 10),
    dayVal: parseInt(getFormatDate({format: 'D'}), 10),
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
/**
 * @returns  stp update data
 */
const getSTPCalendarUpdateUrl = () => {
  const valueMap = {
    staffPositionId: 1,
  };
  let url = API_PATH.STP_CALENDAR_UPDATE;

  return url.replace(/\b(?:staffpositionId)\b/gi, matched => valueMap[matched]);
};

const getUrl = apiPath => {
  const valueMap = {
    staffPositionId: 2,
  };
  let url = apiPath;
  url = url.replace(/\b(?:staffPositionId)\b/gi, matched => valueMap[matched]);

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
  mock
    .onGet('taskinfo/opentask?StaffPositionId=1&PartyId=1&Skip=0&Limit=4')
    .reply(200, taskList);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
  mock.onGet('user/me').reply(200, userInfo);
  mock.onGet(`${API_PATH.PARTY_BY_SPID}/1`).reply(200, party);
  mock
    .onGet('taskinfo/product?StaffPositionId=1&PartyId=1')
    .reply(200, product);
  mock
    .onGet(`${API_PATH.PATCH}/1/parties`)
    .reply(200, patchesMock.getPartyByPatchId);
  mock
    .onPost(`${API_PATH.PATCH}/validate/1`)
    .reply(200, patchesMock.validate.response);
  mock.onGet(getPartiesUrl()).reply(200, partiesMock.getParties.response);
  mock.onDelete(getDeletePartyUrl()).reply(200, true);
  mock.onGet(getSTPCalendarUpdateUrl()).reply(200, stpData);
  mock.onGet(getUrl(API_PATH.COMPLAINCE_MONTHLY)).reply(200, planComplaince);
  mock.onGet(getUrl(API_PATH.STP_STATUS)).reply(200, stpStatus);
  mock.onPost(getUrl(API_PATH.SUBMIT_STP)).reply(200, submitStpMock);

  mock
    .onGet(
      'party/searchpartybyname?StaffPositionId=1&Keyword=abc&PartyTypeId=1&Skip=0&Limit=10',
    )
    .reply(200, docList);
};

export default getMock;
