import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {
  fetchPriorityProductTypeName,
  priorityProductActions,
} from './productSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {API_PATH} from 'screens/directory/apiPath';

// Watcher function of Fetch Priority Product
export function* fetchPriorityProductWatcher() {
  yield takeEvery(fetchPriorityProductTypeName, fetchPriorityProductHandler);
}

// Handler function of Priority Product
function* fetchPriorityProductHandler(action) {
  const {staffPositionID, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_PRODUCT}?StaffPositionId=${staffPositionID}&PartyId=${partyId}`,
    );
    console.log(response);
    yield put(
      priorityProductActions.getPriorityProduct({
        priorityProduct: response.data || [],
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
