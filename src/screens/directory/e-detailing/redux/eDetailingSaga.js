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
    let apiUrl = `${API_PATH.GET_EDETAILING_PRODUCT}?StaffPositionId=${staffPositionID}&IsPriority=true&PartyId=${partyId}&IncludeDiscussedList=true&Skip=${skip}&Limit=${limit}`;
    if (skip !== 0) {
      apiUrl = `${API_PATH.GET_EDETAILING_PRODUCT}?StaffPositionId=${staffPositionID}&IsPriority=true&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`;
    }
    const response = yield call(NetworkService.get, apiUrl);
    if (skip === 0) {
      yield put(
        ePriorityProductActions.getDetailingPriorityProduct({
          detailingPriorityProduct: response.data.brandList,
          totalCount: response.data.totalCount,
          discussedBrandList: response.data.discussedBrandList,
        }),
      );
    } else {
      yield put(
        ePriorityProductActions.getMoreDetailingPriorityProduct({
          detailingPriorityProduct: response.data.brandList,
          totalCount: response.data.totalCount,
          discussedBrandList: response.data.discussedBrandList,
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
    let apiUrl = `${API_PATH.GET_EDETAILING_PRODUCT}?StaffPositionId=${staffPositionID}&IncludeDiscussedList=true&IsPriority=false&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`;
    if (skip !== 0) {
      apiUrl = `${API_PATH.GET_EDETAILING_PRODUCT}?StaffPositionId=${staffPositionID}&IsPriority=false&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`;
    }
    const response = yield call(NetworkService.get, apiUrl);
    if (skip === 0) {
      yield put(
        eOtherProductActions.getDetailingOtherProduct({
          detailingOtherProduct: response.data.brandList,
          otherTotalCount: response.data.totalCount,
          otherDiscussedBrandList: response.data.discussedBrandList,
        }),
      );
    } else {
      yield put(
        eOtherProductActions.getMoreDetailingOtherProduct({
          detailingOtherProduct: response.data.brandList,
          otherTotalCount: response.data.totalCount,
          otherDiscussedBrandList: response.data.discussedBrandList,
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
