import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchAreasCreatorType,
  standardPlanActions,
  fetchPartiesCreatorType,
  fetchPatchesCreatorType,
  fetchPartiesByPatchIdCreatorType,
} from './standardSlice';
import {FetchEnumStatus, fetchStatusSliceActions} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';

/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchPartiesWatcher() {
  yield takeEvery(fetchPartiesCreatorType, fetchPartiesWorker);
}

export function* fetchAreasWatcher() {
  yield takeEvery(fetchAreasCreatorType, fetchAreasWorker);
}

export function* fetchPatchesWatcher() {
  yield takeEvery(fetchPatchesCreatorType, fetchPatchesWorker);
}

export function* fetchPartiesByPatchIdWatcher() {
  yield takeEvery(
    fetchPartiesByPatchIdCreatorType,
    fetchPartiesByPatchIdWorker,
  );
}

/**
 * worker function to send the api call to get all parties list
 */
export function* fetchPartiesWorker(action) {
  const {staffPositionid} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.PARTY_BY_SPID}/${staffPositionid}`,
    );
    yield put(
      standardPlanActions.getParties({
        parties: response.data,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * worker function to send the api call to get all area list
 */

export function* fetchAreasWorker(action) {
  const {staffPositionid} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.AREA_BY_SPID}/${staffPositionid}`,
    );
    yield put(
      standardPlanActions.getAreas({
        areas: response.data,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * worker function to send the api call to get all pat list
 */

export function* fetchPatchesWorker(action) {
  const {staffPositionid} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.PATCH}/${staffPositionid}`,
    );
    yield put(
      standardPlanActions.getPatches({
        patches: response.data,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * worker function to send the api call to get all parties by patch id
 */

export function* fetchPartiesByPatchIdWorker(action) {
  const {staffPositionid, patchID} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.PARTY_BY_SPID}/${staffPositionid}/${patchID}`,
    );
    yield put(
      standardPlanActions.getPartiesByPatchID({
        partyByPatchID: response.data,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
