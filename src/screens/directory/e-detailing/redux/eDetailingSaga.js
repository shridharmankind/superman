import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {
  fetchDetailingPriorityProductTypeName,
  ePriorityProductActions,
  fetchDetailingOtherProductTypeName,
  eOtherProductActions,
} from './eDetailingSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {API_PATH} from 'screens/directory/apiPath';
import EPriorityProduct from '../../../../data/mock/api/ePriorityProduct.json';
import AllPriorityProduct from '../../../../data/mock/api/AllPriority.json';
import EOtherPriorityProduct from '../../../../data/mock/api/eOtherProduct.json';

// Watcher function for priority Product
export function* fetchEDetailingPriorityProductWatcher() {
  yield takeEvery(
    fetchDetailingPriorityProductTypeName,
    fetchEPriorityProductHandler,
  );
}

// Handler function for priority Product
function* fetchEPriorityProductHandler(action) {
  const {staffPositionID, partyId, skip, limit} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_PRIORITY_PRODUCT}?StaffPositionId=${staffPositionID}&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`,
    );
    if (skip === 0) {
      yield put(
        ePriorityProductActions.getDetailingPriorityProduct({
          detailingPriorityProduct: EPriorityProduct,
          //detailingPriorityProduct: response.data,
        }),
      );
    } else {
      yield put(
        ePriorityProductActions.getMoreDetailingPriorityProduct({
          // detailingPriorityProduct: response.data,
          detailingPriorityProduct: AllPriorityProduct,
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

// Watcher function for Other Product
export function* fetchEDetailingOtherProductWatcher() {
  yield takeEvery(
    fetchDetailingOtherProductTypeName,
    fetchEOtherProductHandler,
  );
}

// Handler function for other Product
function* fetchEOtherProductHandler(action) {
  const {staffPositionID, partyId, skip, limit} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_OTHER_PRODUCT}?StaffPositionId=${staffPositionID}&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`,
    );
    if (skip === 0) {
      yield put(
        eOtherProductActions.getDetailingOtherProduct({
          //detailingOtherProduct: response.data,
          detailingOtherProduct: EOtherPriorityProduct,
        }),
      );
    } else {
      yield put(
        eOtherProductActions.getMoreDetailingOtherProduct({
          // detailingOtherProduct: response.data,
          detailingOtherProduct: EOtherPriorityProduct,
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
