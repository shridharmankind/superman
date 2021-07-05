import {takeEvery, call, put} from 'redux-saga/effects';
import {
  getSubordinatesTypeName,
  monthlyActions,
  fetchWorkingDayCreatorType,
  fetchSTPStatusCreatorType,
  submitSTPCreatorType,
  swapCreatorType,
  fetchMTPCalendarUpdateCreatorType,
} from './monthlySlice';
import {FetchEnumStatus, fetchStatusSliceActions} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/tourPlan/apiPath';
import API_PATHS from 'services/network/apiPaths';
import {getDateIntoObject} from 'utils/dateTimeHelper';
/**
 * saga watcher to fetch the doctor detail
 */
export function* fetchSubOrdinatesWatcher() {
  yield takeEvery(getSubordinatesTypeName, fetchSubOrdinatesWorker);
}

export function* fetchWorkingDayWatcher() {
  yield takeEvery(fetchWorkingDayCreatorType, fetchWorkingDayWorker);
}

export function* fetchSTPStatusWatcher() {
  yield takeEvery(fetchSTPStatusCreatorType, fetchSTPStatusWorker);
}

export function* submitSTPWatcher() {
  yield takeEvery(submitSTPCreatorType, submitSTPWorker);
}

export function* setSwapWatcher() {
  yield takeEvery(swapCreatorType, swapWorker);
}

/**
 * Function to fetch stp update worker
 */
export function* fetchMTPCalendarUpdateWatcher() {
  yield takeEvery(fetchMTPCalendarUpdateCreatorType, updateMTPCalendarWorker);
}
/**
 * worker function to send the api call to get all subordinates list
 */
export function* fetchSubOrdinatesWorker(action) {
  const {staffPositionid} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SUBORDINATES}/${staffPositionid}`,
    );
    yield put(
      monthlyActions.getSubordinates({
        subOrdinates: {
          data: response.data,
        },
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

export function* fetchWorkingDayWorker(action) {
  const userId = action.payload.userId;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.WORKING_DAY}/${userId}`,
    );
    yield put(
      monthlyActions.getWorkingDay({
        workingDay: response.data?.workingDay,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

export function* fetchSTPStatusWorker(action) {
  const {staffPositionId, year} = action.payload;
  const valueMap = {
    staffPositionId: staffPositionId,
    year: year,
  };
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  const url = `${API_PATHS.TOUR_PLAN_STATUS}/${staffPositionId}`;

  try {
    const response = yield call(NetworkService.get, url);
    yield put(
      monthlyActions.getSTPStatus({
        stpStatus: response.data,
      }),
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

export function* submitSTPWorker(action) {
  const staffPositionId = action.payload.staffPositionId;
  const valueMap = {
    staffPositionId: staffPositionId,
  };
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  let url = API_PATH.SUBMIT_STP;
  url = url.replace(/\b(?:staffPositionId)\b/gi, matched => valueMap[matched]);
  try {
    const response = yield call(NetworkService.post, url);
    yield put(
      monthlyActions.submitSTP({
        submitSTP: response.data,
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

/**
 * Handles STP handle action
 * @param {Object} action
 */
export function* updateMTPCalendarWorker(action) {
  const {staffPositionId, month} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  const valueMap = {
    staffPositionId,
    monthVal: month,
  };
  let url = API_PATHS.MTP_ROLLOVER;
  url = url.replace(
    /\b(?:staffpositionId|monthVal)\b/gi,
    matched => valueMap[matched],
  );
  try {
    const response = yield call(NetworkService.get, url);
    if (response.data.error || response.status !== 200) {
      yield put(
        monthlyActions.MTPCalendarUpdate({
          mtpData: {
            data: null,
            error: response.data.error,
          },
        }),
      );
    } else {
      yield put(
        monthlyActions.MTPCalendarUpdate({
          mtpData: {
            data: response?.data?.map(item => {
              return {
                ...item,

                date: getDateIntoObject(item?.dated),
              };
            }),
            error: null,
          },
        }),
      );
    }
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

export function* swapWorker(action) {
  const {staffPositionId, obj} = action.payload;
  const valueMap = {
    staffPositionId: staffPositionId,
  };
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  let url = API_PATHS.SWAP;
  url = url.replace(/\b(?:staffPositionId)\b/gi, matched => valueMap[matched]);
  try {
    const response = yield call(NetworkService.put, url, obj);
    yield put(
      monthlyActions.setSwap({
        setSwap: response.data,
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
