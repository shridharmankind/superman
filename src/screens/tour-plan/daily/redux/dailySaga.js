import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchDoctorDetailTypeName,
  doctorDetailActions,
  deletePartyTypeName,
} from './dailySlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
import {Constants, Strings} from 'common';
/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchDoctorDetailWatcher() {
  yield takeEvery(fetchDoctorDetailTypeName, fetchDoctorDetailWorker);
}

/**
 * saga watcher to remove a party
 */
export function* deletePartyWatcher() {
  yield takeEvery(deletePartyTypeName, deletePartyWorker);
}

/**
 * worker function to send the api call to get all doctor details for the current day
 */
export function* fetchDoctorDetailWorker(action) {
  const {staffPositionid, day, month, year} = action.payload;
  const valueMap = {
    staffpositionid: staffPositionid,
    monthVal: month,
    yearVal: year,
    dayVal: day,
  };
  let url = API_PATH.GET_PARTIES;
  url = url.replace(
    /\b(?:staffpositionid|monthVal|yearVal|dayVal)\b/gi,
    matched => valueMap[matched],
  );

  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(NetworkService.get, url);
    let formattedResponse = [];
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      formattedResponse = response.data.map((data, idx) => {
        data.key = idx + 1;
        return data;
      });
    }

    yield put(
      doctorDetailActions.getDoctorDetail({
        doctorDetail: {
          data: formattedResponse,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(
      doctorDetailActions.deletePartyError({
        doctorDetail: {
          error: Strings.errorFetchingParties,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * worker function to send the api call to remove a party from the daily plan
 */
export function* deletePartyWorker(action) {
  const {staffPositionid, day, month, year, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const valueMap = {
      staffpositionid: staffPositionid,
      partyid: partyId,
    };
    let url = API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN;
    url = url.replace(
      /\b(?:staffpositionid|partyid)\b/gi,
      matched => valueMap[matched],
    );

    const response = yield call(NetworkService.Delete, url, {
      day: day,
      month: month,
      year: year,
    });

    if (response.status === Constants.HTTP_OK) {
      yield put(doctorDetailActions.doctorRemoved(action.payload));
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(
      doctorDetailActions.deletePartyError({
        doctorDetail: {
          error: Strings.errorRemovingParty,
        },
      }),
    );
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
