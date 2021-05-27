import {takeEvery, call, put} from 'redux-saga/effects';
import {
  getSubordinatesTypeName,
  monthlyActions,
  fetchWorkingDayCreatorType,
} from './monthlySlice';
import {FetchEnumStatus, fetchStatusSliceActions} from 'reducers';
import {NetworkService} from 'services';
import {getSubordinates, workingDay} from 'screens/tourPlan/apiPath';

/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchSubOrdinatesWatcher() {
  yield takeEvery(getSubordinatesTypeName, fetchSubOrdinatesWorker);
}

export function* fetchWorkingDayWatcher() {
  yield takeEvery(fetchWorkingDayCreatorType, fetchWorkingDayWorker);
}

/**
 * worker function to send the api call to get all subordinates list
 */
export function* fetchSubOrdinatesWorker(action) {
  const {staffPositionid} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${getSubordinates}/${staffPositionid}`,
    );
    yield put(
      monthlyActions.getSubordinates({
        subOrdinates: {
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

export function* fetchWorkingDayWorker(action) {
  const userId = action.payload.userId || 1;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(NetworkService.get, `${workingDay}/${userId}`);
    yield put(
      monthlyActions.getWorkingDay({
        workingDay: response.data?.workingDay,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
