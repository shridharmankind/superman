import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {fetchTimelineTypeName, timelineActions} from './timelineSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {API_PATH} from 'screens/directory/apiPath';

/**
 * Watcher function
 *
 * @export
 */
export function* fetchTimelineWatcher() {
  yield takeEvery(fetchTimelineTypeName, fetchTimelineHandler);
}

/**
 * Handler function
 *
 * @param {Object} action
 */
function* fetchTimelineHandler(action) {
  const {staffPositionId, partyId, start, end} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_TIMELINE}?StaffPositionId=${staffPositionId}&PartyId=${partyId}&StartDate=${start}&EndDate=${end}`,
    );
    console.log(response);
    yield put(timelineActions.getTimeline(response.data));
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
