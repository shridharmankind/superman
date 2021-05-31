import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchDoctorDetailTypeName,
  doctorDetailActions,
  deletePartyTypeName,
} from './dailySlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
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

  try {
    const response = yield call(NetworkService.post, API_PATH.GET_PARTIES, {
      staffPositionid: staffPositionid,
      day: day,
      month: month,
      year: year,
    });

    console.log('response from api', response);

    // const response = yield call(NetworkService.get, API_PATH.GET_PARTIES);

    console.log('response', response);
    yield put(
      doctorDetailActions.getDoctorDetail({
        doctorDetail: {
          data: response.data,
          fetched: true,
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
  console.log('***************', action);
  try {
    const response = yield call(
      NetworkService.Delete,
      API_PATH.REMOVE_PARTY_FROM_DAILY_PLAN,
      {
        staffPositionid: staffPositionid,
        day: day,
        month: month,
        year: year,
        partyId: partyId,
      },
    );

    console.log('response', response);
    // if (response.data) {
    yield put(doctorDetailActions.doctorRemoved(action.payload));
    // }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
