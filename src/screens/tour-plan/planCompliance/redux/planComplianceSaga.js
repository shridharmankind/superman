import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchPlanComplianceTypeName,
  planComplianceActions,
} from './planComplianceSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
import {Strings} from 'common';
import {COMPLAINCE_TYPE} from 'screens/tourPlan/constants';

/**
 * saga watcher to fetch the plan compliance rules
 */
export function* fetchPlanComplianceWatcher() {
  yield takeEvery(fetchPlanComplianceTypeName, fetchPlanComplianceWorker);
}

/**
 * worker function to send the api call to get all plan compliance rules
 */
export function* fetchPlanComplianceWorker(action) {
  const {staffPositionId, type, week = 1, weekDay = 1} = action.payload;
  let url;
  // set url on basis of compliance type selected
  if (type === COMPLAINCE_TYPE.MONTHLY) {
    const valueMap = {
      staffPositionId: staffPositionId,
    };
    url = API_PATH.COMPLAINCE_MONTHLY.replace(
      /\b(?:staffPositionId)\b/gi,
      matched => valueMap[matched],
    );
  } else {
    if (type === COMPLAINCE_TYPE.DAILY) {
      const valueMap = {
        staffPositionId: staffPositionId,
        weekVal: week,
        weekdayVal: weekDay,
      };
      url = API_PATH.COMPLAINCE_DAILY.replace(
        /\b(?:staffPositionId|weekVal|weekdayVal)\b/gi,
        matched => valueMap[matched],
      );
    }
  }

  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(NetworkService.get, url);
    if (response.data) {
      yield put(
        planComplianceActions.getComplainceRules({
          rules: {
            [type]: response.data,
            error: null,
          },
        }),
      );
    } else {
      yield put(
        planComplianceActions.getComplainceRules({
          rules: {
            error: Strings.errorFetchingComplianceRules,
          },
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(
      planComplianceActions.getComplainceRules({
        rules: {
          error: Strings.errorFetchingComplianceRules,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
