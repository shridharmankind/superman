import MockAdapter from 'axios-mock-adapter';
import {NetworkService} from 'services';

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
import monthlyplanComplaince from './api/planComplaince.json';
import dailyPlanComplaince from './api/dailyPlanComplaince.json';
import docList from './api/searchDocList.json';
import EPriorityProductList from './api/ePriorityProduct.json';
import EOtherProductList from './api/eOtherProduct.json';
import AllPriority from './api/AllPriority.json';
import qualifications from './api/masterDataDownload/qualifications.json';
import specialities from './api/masterDataDownload/specialities.json';
import mtpData from './api/mtpData.js';
import {partiesMock} from './api/parties.js';
import stpData from './api/stpData.js';
import stpStatus from './api/stpStatus.json';
import submitStpMock from './api/submitStp.json';

import {API_PATH} from 'screens/tour-plan/apiPath';
import {API_PATH as DIRECTORY_APIS} from 'screens/directory/apiPath';
import API_PATHS from 'services/network/apiPaths';
import visitMockData from './api/timeline.json';
import missedCallMockData from './api/missedCalls.json';
import addToTodayMockData from './api/addToToday.json';

import {API_PATH as NETWORK_APIS} from 'screens/tour-plan/apiPath';
import staff from './api/staff.json';
import searchSamples from './api/searchSamples.json';

const getPartiesUrl = () => {
  const valueMap = {
    staffpositionid: 1,
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

const getDailyComplainceUrl = () => {
  const valueMap = {
    staffPositionId: 2,
    weekVal: 1,
    weekdayVal: 1,
  };
  return API_PATH.COMPLAINCE_DAILY.replace(
    /\b(?:staffPositionId|weekVal|weekdayVal)\b/gi,
    matched => valueMap[matched],
  );
};

const getSTPStatusUrl = apiPath => {
  const valueMap = {
    staffPositionId: 2,
    year: parseInt(getFormatDate({format: 'YYYY'}), 10),
  };
  let url = apiPath;
  url = url.replace(
    /\b(?:staffPositionId|year)\b/gi,
    matched => valueMap[matched],
  );

  return url;
};

const getMissedCallUrl = apipath => {
  const valueMap = {
    staffPositionId: 1,
    month: parseInt(getFormatDate({format: 'M'}), 10),
  };
  let url = apipath;
  url = url.replace(
    /\b(?:staffPositionId|month)\b/gi,
    matched => valueMap[matched],
  );

  return url;
};

const getUrl = apiPath => {
  const valueMap = {
    staffPositionId: 1,
  };
  let url = apiPath;
  url = url.replace(/\b(?:staffPositionId)\b/gi, matched => valueMap[matched]);
  return url;
};

const getMTPCalendarUpdateUrl = apiPath => {
  const valueMap = {
    staffPositionId: 1,
    month: 6,
  };
  let url = apiPath;
  url = url.replace(
    /\b(?:staffPositionId|month)\b/gi,
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
  mock
    .onGet('taskinfo/opentask?StaffPositionId=1&PartyId=1&Skip=0&Limit=4')
    .reply(200, taskList);
  mock.onGet('/getSubordinates').reply(200, tourPlanMock.subOrdinates.u1);
  mock.onGet('user/me').reply(200, userInfo);
  mock.onGet(`${API_PATH.PARTY_BY_SPID}/1`).reply(200, party);
  mock
    .onGet('/product/motherbrands?StaffPositionId=1&PartyId=1')
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
  mock
    .onGet(getMTPCalendarUpdateUrl(API_PATHS.MTP_CALENDAR))
    .reply(200, mtpData);
  mock.onGet(getDailyComplainceUrl()).reply(200, dailyPlanComplaince);
  mock
    .onGet(getUrl(API_PATH.COMPLAINCE_MONTHLY))
    .reply(200, monthlyplanComplaince);
  mock.onGet(`${API_PATHS.TOUR_PLAN_STATUS}/1`).reply(200, stpStatus);
  mock.onPost(getUrl(API_PATH.SUBMIT_STP)).reply(200, submitStpMock);

  mock
    .onGet(
      'party/searchpartybyname?StaffPositionId=1&Keyword=ra&PartyTypeId=1&Skip=0&Limit=10',
    )
    .reply(200, docList);
  mock
    .onGet(
      '/edetailing/motherbrands?StaffPositionId=1&IsPriority=true&PartyId=1&IncludeDiscussedList=true&Skip=0&Limit=0',
    )
    .reply(200, EPriorityProductList);
  mock
    .onGet(
      '/edetailing/motherbrands?StaffPositionId=1&PartyId=1&IsPriority=true&Skip=0&Limit=10',
    )
    .reply(200, AllPriority);
  mock
    .onGet(
      '/edetailing/motherbrands?StaffPositionId=1&IncludeDiscussedList=true&IsPriority=false&PartyId=1&Skip=0&Limit=0',
    )
    .reply(200, EOtherProductList);
  mock
    .onGet(
      '/edetailing/motherbrands?StaffPositionId=1&PartyId=1&IsPriority=false&Skip=10&Limit=10',
    )
    .reply(200, AllPriority);
  mock
    .onGet(
      `${DIRECTORY_APIS.GET_TIMELINE}?StaffPositionId=1&PartyId=1&StartDate=2021-04-01&EndDate=2021-06-30`,
    )
    .reply(200, visitMockData);

  // master data download :: TO DO:: temp web fix
  // mock
  //   .onGet(NetworkService.API.FETCH_QUALIFICATIONS)
  //   .reply(200, qualifications);
  // mock.onGet(NetworkService.API.FETCH_SPECIALITIES).reply(200, specialities);
  mock.onPut(getUrl(API_PATHS.SWAP)).reply(200, true);
  mock
    .onGet(getMissedCallUrl(API_PATHS.GET_MISSED_CALLS))
    .reply(200, missedCallMockData);
  mock
    .onPost(`${API_PATHS.ADD_TODAY_PLAN}?staffPositionId=1&partyId=2`)
    .reply(200, addToTodayMockData);
  mock.onGet('staff/getreporters/1').reply(200, staff);
  mock
    .onGet('getsamples?StaffPositionId=1&searchKeyword=a')
    .reply(200, searchSamples);
};

export default getMock;
