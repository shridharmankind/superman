import {takeEvery, call, put} from 'redux-saga/effects';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {
  fetchWMonthlyPlanCreatorType,
  monthlyPlanActions,
} from './monthlyPlanSlice';
import {NetworkService} from 'services';
import {workingDay} from 'screens/tourPlan/apiPath';

/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchMonthlyPlanWatcher() {
  yield takeEvery(fetchWMonthlyPlanCreatorType, fetchMonthlyPlanWorker);
}

/**
 * worker function to send the api call to get all doctor details for the current day
 */
export function* fetchMonthlyPlanWorker(action) {
  const userId = action.payload.userId || 1;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(NetworkService.get, `${workingDay}/${userId}`);
    yield put(
      monthlyPlanActions.getWorkingDay({
        workingDay: response.data.workingDay,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
