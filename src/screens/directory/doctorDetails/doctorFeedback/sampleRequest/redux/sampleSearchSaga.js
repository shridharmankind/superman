import {
  searchSamplesType,
  selectSamplesType,
  searchSamplesActions,
} from 'screens/directory/doctorDetails/doctorFeedback/sampleRequest/redux';
import {call, put, takeEvery} from 'redux-saga/effects';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';

export function* searchSamplesWatcher() {
  yield takeEvery(searchSamplesType, searchSampleHandler);
}

export function* selectSamplesWatcher() {
  yield takeEvery(selectSamplesType, selectSampleHandler);
}

function* searchSampleHandler(action) {
  const {staffPositionId, searchKey} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `getsamples?StaffPositionId=${staffPositionId}&searchKeyword=${searchKey}`,
    );

    yield put(
      searchSamplesActions.getSamples({
        samples: [...response.data.samples],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* selectSampleHandler(action) {
  yield put(
    searchSamplesActions.selectSamples({
      selectedSamples: [...action.payload],
    }),
  );
}
