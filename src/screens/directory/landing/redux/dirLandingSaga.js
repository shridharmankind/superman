import {
  fetchSearchDoctorsTypeName,
  searchDoctorActions,
  landingActions,
  fetchMissedCallsypeName,
  addPartyToDailyPlanTypeName,
} from './dirlandingSlice';
import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/directory/apiPath';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';

export function* fetchQueryDoctorsWatcher() {
  yield takeEvery(fetchSearchDoctorsTypeName, fetchSearchDoctorsHandler);
}

export function* fetchMissedCallsWatcher() {
  yield takeEvery(fetchMissedCallsypeName, fetchMissedCallsWorker);
}

export function* addPartyToDailyPlanWatcher() {
  yield takeEvery(addPartyToDailyPlanTypeName, addPartyToDailyPlanWorker);
}

function* fetchSearchDoctorsHandler(action) {
  const {staffPositionId, partyTypeId, skip, limit, searchKeyword} =
    action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SEARCH_DOCTORS}?StaffPositionId=${staffPositionId}&Keyword=${searchKeyword}&PartyTypeId=${partyTypeId}&Skip=${skip}&Limit=${limit}`,
    );
    if (skip === 0) {
      yield put(
        searchDoctorActions.getDoctors({
          docList: {
            searchCount: response.data.searchCount,
            doctors: response.data.searchParties,
          },
        }),
      );
    } else {
      yield put(
        searchDoctorActions.getMoreDoctors({
          docList: {
            searchCount: response.data.searchCount,
            doctors: response.data.searchParties,
          },
        }),
      );
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * worker function to send the api call to fetch missed calls list
 */
export function* fetchMissedCallsWorker(action) {
  const {staffPositionId, month} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const valueMap = {
      staffPositionId: staffPositionId,
      month: month,
    };
    let url = API_PATH.GET_MISSED_CALLS;
    url = url.replace(
      /\b(?:staffPositionId|month)\b/gi,
      matched => valueMap[matched],
    );

    const response = yield call(NetworkService.get, url);

    yield put(
      landingActions.getMissedCalls({
        parties: {
          missedCalls: response.data || [],
        },
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(
      landingActions.getMissedCalls({
        parties: {
          missedCalls: [],
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

export function* addPartyToDailyPlanWorker(action) {
  const {staffPositionId, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    // const valueMap = {
    //   staffPositionId: staffPositionId,
    //   partyId: partyId,
    // };
    // let url = API_PATH.GET_MISSED_CALLS;
    // url = url.replace(
    //   /\b(?:staffPositionId|partyId)\b/gi,
    //   matched => valueMap[matched],
    // );

    const response = yield call(
      NetworkService.post,
      API_PATH.ADD_TODAY_PLAN,
      {},
      {
        staffPositionId: staffPositionId,
        partyId: partyId,
      },
    );

    console.log('response', response.data);

    if (response.data.id && !response.data.isMissed) {
      yield put(
        landingActions.addPartyToDailyPlan({
          parties: {
            partyMovedToDaily: true,
          },
        }),
      );
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(
      landingActions.addPartyToDailyPlan({
        parties: {
          partyMovedToDaily: false,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}


