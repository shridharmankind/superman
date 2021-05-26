import {takeEvery} from 'redux-saga/effects';
import {
  fetchDoctorDetailCreator,
  fetchDoctorDetailTypeName,
  doctorDetailActions,
} from './dailySlice';
import {fetchStatusSliceActions} from 'reducers';
import {call, put, select} from 'redux-saga/effects';
import {dailySelector} from './dailySelector';
import {FetchEnumStatus} from 'reducers';
import axios from 'axios';
import {NetworkService} from 'services';

export function* fetchDoctorDetailWatcher() {
  yield takeEvery(fetchDoctorDetailTypeName, fetchDoctorDetailWorker);
}

/**
 * a worker (generator)
 */
export function* fetchDoctorDetailWorker(action) {
  console.log('action', action);
  const {staffPositionid, day, month, year} = action.payload;
  /**
   * Update status for fetching state
   */
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  /**
   * fetch Data
   */
  try {
    let targetUrl = 'http://52.140.117.105:5001/api/Mtp/getParties';
    // let targetUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

    const response = yield call(NetworkService.post, 'Mtp/getParties', {
      staffPositionid: staffPositionid,
      day: day,
      month: month,
      year: year,
    });
    console.log('here', response.data);
    /**
     * Update todo state
     */
    yield put(
      doctorDetailActions.getDoctorDetail({
        doctorDetail: {
          data: response.data,
        },
      }),
    );

    /**
     * Update fetch Status failed
     */
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);

    /**
     * Update fetch Status failed
     */
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
