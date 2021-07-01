import {takeEvery, call, put} from 'redux-saga/effects';
import {fetchDcrDetailType, dcrActions, visitDetailType} from './dcrSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/directory/apiPath';

export function* fetchDcrWatcher() {
  yield takeEvery(fetchDcrDetailType, fetchDcrHandler);
}

export function* setVisitWatcher() {
  yield takeEvery(visitDetailType, fetchVisitHandler);
}

function* fetchDcrHandler(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SENIOR}/${staffPositionId}`,
    );

    yield put(
      dcrActions.getSeniors({
        seniorList: [...response.data],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* fetchVisitHandler(action) {
  yield put(
    dcrActions.setVisitors({
      visitLisit: [...action.payload],
    }),
  );
}
