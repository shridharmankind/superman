import {
  fetchSearchDoctorsTypeName,
  searchDoctorActions,
} from './dirlandingSlice';
import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/directory/apiPath';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';

export function* fetchQueryDoctorsWatcher() {
  yield takeEvery(fetchSearchDoctorsTypeName, fetchSearchDoctorsHandler);
}

function* fetchSearchDoctorsHandler(action) {
  const {staffPositionId, partyTypeId, skip, limit, searchKeyword} =
    action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SEARCH_DOCTORS}?StaffPositionId=${staffPositionId}&Keyword=${searchKeyword}&PartyTypeId=${partyTypeId}&Skip=${skip}&Limit=${limit}`,
    );
    if (skip === 0) {
      yield put(
        searchDoctorActions.getDoctors({
          docList: {
            searchCount: response.data.searchCount,
            doctors: response.data.searchParties,
          },
        }),
      );
    } else {
      yield put(
        searchDoctorActions.getMoreDoctors({
          docList: {
            searchCount: response.data.searchCount,
            doctors: response.data.searchParties,
          },
        }),
      );
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
