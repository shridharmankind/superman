import {takeEvery, call, put} from 'redux-saga/effects';
import {fetchDoctorDetailTypeName, doctorDetailActions} from './dailySlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {getParties} from 'screens/tourPlan/apiPath';

/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchDoctorDetailWatcher() {
  yield takeEvery(fetchDoctorDetailTypeName, fetchDoctorDetailWorker);
}

/**
 * worker function to send the api call to get all doctor details for the current day
 */
export function* fetchDoctorDetailWorker(action) {
  const {staffPositionid, day, month, year} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(NetworkService.post, getParties, {
      staffPositionid: staffPositionid,
      day: day,
      month: month,
      year: year,
    });
    yield put(
      doctorDetailActions.getDoctorDetail({
        doctorDetail: {
          data: response.data,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
