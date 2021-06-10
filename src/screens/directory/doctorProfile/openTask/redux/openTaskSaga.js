import {call, takeEvery, put} from '@redux-saga/core/effects';
import {NetworkService} from 'services';
import {fetchOpenTasksTypeName, openTaskActions} from './openTaskSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {API_PATH} from 'screens/directory/apiPath';

// Watcher function\
export function* fetchTaskWatcher() {
  yield takeEvery(fetchOpenTasksTypeName, fetchTaskHandler);
}

// Handler function
function* fetchTaskHandler(action) {
  const {staffPositionID, partyId, skip, limit} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_TASKS}?StaffPositionId=${staffPositionID}&PartyId=${partyId}&Skip=${skip}&Limit=${limit}`,
    );
    if (skip === 0) {
      yield put(
        openTaskActions.getOpenTasks({
          task: {
            opentasks: response.data.openTasks,
            count: response.data.totalCount,
          },
        }),
      );
    } else {
      yield put(
        openTaskActions.getMoreTasks({
          task: {
            opentasks: response.data.openTasks,
            count: response.data.totalCount,
          },
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
