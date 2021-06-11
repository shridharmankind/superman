import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchPlanComplianceTypeName,
  planComplianceActions,
} from './planComplianceSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
import {Strings} from 'common';

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
  const {staffPositionid} = action.payload;
  const valueMap = {
    staffPositionId: 2, //staffPositionid,
  };
  let url = API_PATH.COMPLAINCE_MONTHLY;
  url = url.replace(/\b(?:staffPositionId)\b/gi, matched => valueMap[matched]);

  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(NetworkService.get, url);
    console.log('response', url, response);
    if (response.data) {
      yield put(
        planComplianceActions.getComplainceRules({
          rules: {
            data: response.data,
          },
        }),
      );
    } else {
      yield put(
        planComplianceActions.getComplainceRules({
          doctorDetail: {
            error: Strings.errorFetchingComplianceRules,
          },
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(
      planComplianceActions.getComplainceRules({
        doctorDetail: {
          error: Strings.errorFetchingComplianceRules,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
