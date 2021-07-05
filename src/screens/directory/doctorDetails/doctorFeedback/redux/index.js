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
} from './dcrSlice';

export {dcrSelector} from './dcrSelector';

export {
  fetchDcrWatcher,
  setVisitWatcher,
  fetchStaffWatcher,
  searchSamplesWatcher,
  selectSamplesWatcher,
  searchItemsWatcher,
  getDoctorDataList,
} from './dcrSaga';
