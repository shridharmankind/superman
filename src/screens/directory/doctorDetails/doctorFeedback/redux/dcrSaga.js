import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchDcrDetailType,
  dcrActions,
  visitDetailType,
  fetchDoctorListType,
  fetchEDetailedListType,
  fetchOtherProductsType,
} from './dcrSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/directory/apiPath';

export function* fetchDcrWatcher() {
  yield takeEvery(fetchDcrDetailType, fetchDcrHandler);
}

export function* fetchEdetailedWatcher() {
  yield takeEvery(fetchEDetailedListType, fetchEdetailedList);
}

export function* fetchOtherProductsWatcher() {
  yield takeEvery(fetchOtherProductsType, fetchOtherList);
}

export function* setVisitWatcher() {
  yield takeEvery(visitDetailType, fetchVisitHandler);
}

export function* getDoctorDataList() {
  yield takeEvery(fetchDoctorListType, getDoctorList);
}

function* fetchOtherList(action) {
  console.log(action.payload, 'as');
  const {staffPositionId, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    console.log('asasa');
    const apiUrl = `${
      API_PATH.GET_EDETAILING_PRODUCT
    }?StaffPositionId=${staffPositionId}PartyId=${partyId}&Skip=${0}&Limit=${0}`;
    console.log(apiUrl);
    const response = yield call(NetworkService.get, apiUrl);
    console.log(apiUrl);

    yield put(
      dcrActions.getOtherProductList({
        otherProducts: response?.data?.brandList || [],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
function* fetchEdetailedList(action) {
  const {staffPositionId, partyIds} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.post,
      API_PATH.GET_EDETAILED_LIST,
      {
        staffPositionId: staffPositionId,
        partyIds: partyIds,
      },
    );
    yield put(
      dcrActions.getEdetailedList({
        eDetailProducts: response?.data[0]?.eDetailedList || [],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* getDoctorList(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_DOCTOR_LIST}/${staffPositionId}?partyTypeGroupId=1`,
    );
    yield put(
      dcrActions.getDoctors({
        doctorList: [...response.data],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* fetchDcrHandler(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SENIOR}/${staffPositionId}`,
    );

    yield put(
      dcrActions.getSeniors({
        seniorList: [...response.data],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* fetchVisitHandler(action) {
  yield put(
    dcrActions.setVisitors({
      visitLisit: [...action.payload],
    }),
  );
}
