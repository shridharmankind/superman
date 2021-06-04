import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchDoctorDetailTypeName,
  doctorDetailActions,
  deletePartyTypeName,
} from './dailySlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
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
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  let url = 'mtp/2/parties?Month=5&Year=2021&Day=5';
  try {
    const response = yield call(NetworkService.get, url);

    const formattedResponse = (response.data || []).map((data, idx) => {
      data.key = idx + 1;
      return data;
    });

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
    let url = `mtp/${staffPositionid}/party/${partyId}`;
    console.log('url for delete', url);
    const response = yield call(NetworkService.Delete, url, {
      day: day,
      month: month,
      year: year,
      partyId: partyId,
    });
    console.log('response for delte', response.data);

    if (response.data) {
      yield put(doctorDetailActions.doctorRemoved(action.payload));
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
