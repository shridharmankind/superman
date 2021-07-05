export {
  visitDetail,
  fetchDcrData,
  fetchStaffDetail,
  dcrActions,
  dcrReducer,
  searchSamples,
  selectSamples,
  searchItems,
  fetchDoctorList,
  fetchEDetailedList,
  fetchOtherProducts,
} from './dcrSlice';

export {dcrSelector} from './dcrSelector';

export {
  fetchDcrWatcher,
  setVisitWatcher,
  fetchStaffWatcher,
  searchSamplesWatcher,
  searchItemsWatcher,
  getDoctorDataList,
  fetchEdetailedWatcher,
  fetchOtherProductsWatcher,
} from './dcrSaga';
