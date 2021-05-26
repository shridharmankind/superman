import {takeEvery, call, put} from 'redux-saga/effects';
import {getSubordinatesTypeName, subOrdinateActions} from './monthlySlice';
import {FetchEnumStatus, fetchStatusSliceActions} from 'reducers';
import {NetworkService} from 'services';
import {getSubordinates} from 'screens/tourPlan/apiPath';

/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchSubOrdinatesWatcher() {
  yield takeEvery(getSubordinatesTypeName, fetchSubOrdinatesWorker);
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
      subOrdinateActions.getSubordinates({
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
