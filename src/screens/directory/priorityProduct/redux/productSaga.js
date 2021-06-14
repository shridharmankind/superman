import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {
  fetchPriorityProductTypeName,
  priorotyProductActions,
} from './productSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {API_PATH} from 'screens/directory/apiPath';

// Watcher function\
export function* fetchPriorityProductWatcher() {
  yield takeEvery(fetchPriorityProductTypeName, fetchTaskHandler);
}

// Handler function
function* fetchTaskHandler(action) {
  const {staffPositionID, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_PRODUCT}?StaffPositionId=${staffPositionID}&PartyId=${partyId}`,
    );
    yield put(
      priorotyProductActions.getPriorityProduct({
        priorityProduct: response.data.priorityProduct,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
