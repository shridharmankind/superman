import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchDcrDetailType,
  dcrActions,
  visitDetailType,
  fetchDoctorListType,
  fetchEDetailedListType,
  fetchOtherProductsType,
  fetchStaffDetailType,
  fetchDcrDataType,
  searchSamplesType,
  selectSamplesType,
  searchItemsType,
} from './dcrSlice';
import {fetchStatusSliceActions, FetchEnumStatus} from 'reducers';
import {NetworkService} from 'services';
import {API_PATH} from 'screens/directory/apiPath';

export function* fetchStaffWatcher() {
  yield takeEvery(fetchStaffDetailType, fetchStaffHandler);
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

export function* fetchDcrWatcher() {
  yield takeEvery(fetchDcrDataType, fetchDcrHandler);
}

export function* searchSamplesWatcher() {
  yield takeEvery(searchSamplesType, searchSampleHandler);
}
export function* selectSamplesWatcher() {
  yield takeEvery(selectSamplesType, selectSampleHandler);
}
export function* searchItemsWatcher() {
  yield takeEvery(searchItemsType, searchItemsHandler);
}

function* fetchOtherList(action) {
  const {staffPositionId, partyId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const apiUrl = `${
      API_PATH.GET_EDETAILING_PRODUCT
    }?StaffPositionId=${staffPositionId}&PartyId=${partyId}&Skip=${0}&Limit=${0}`;
    const response = yield call(NetworkService.get, apiUrl);

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

function* fetchStaffHandler(action) {
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

function* fetchDcrHandler(action) {
  const {
    staffPositionId,
    partyIds,
    doctorName,
    doctorData,
    selectedDocData,
    addDoctor,
  } = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    let trailingUrl = '';
    for (let i = 0; i < partyIds.length; i++) {
      trailingUrl += `&PartyIds=${partyIds[i]}`;
    }
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_DCR_DATA}?StaffPositionId=${staffPositionId}${trailingUrl}`,
    );

    if (doctorName) {
      if (response.data) {
        response.data[0].partyName = doctorName;
      }
      yield put(
        dcrActions.getDoctorDetails({
          doctors: [...response.data],
        }),
      );
    }
    if (addDoctor && addDoctor === true) {
      yield put(
        dcrActions.setDoctorList({
          doctorData: doctorData,
          selectedDocData: selectedDocData,
          doctors: [...response.data],
        }),
      );
    }

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* searchSampleHandler(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_SAMPLES}?StaffPositionId=${staffPositionId}`,
    );

    yield put(
      dcrActions.getSamples({
        samples: [...response.data],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* searchItemsHandler(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_ITEMS}?StaffPositionId=${staffPositionId}`,
    );

    yield put(
      dcrActions.getItems({
        items: [...response.data],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}

function* selectSampleHandler(action) {
  yield put(
    dcrActions.selectSamples({
      selectedSamples: [...action.payload],
    }),
  );
}

export function* getDoctorDataList() {
  yield takeEvery(fetchDoctorListType, getDoctorList);
}

function* getDoctorList(action) {
  const {staffPositionId} = action.payload;
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const response = yield call(
      NetworkService.get,
      `${API_PATH.GET_DOCTOR_LIST}/${staffPositionId}?partyTypeGroupId=1`,
    );
    let dataValue = [];
    if (response?.data?.length > 0) {
      dataValue = [...response.data];
      dataValue.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    yield put(
      dcrActions.getDoctors({
        doctorList: [...dataValue],
      }),
    );

    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
