export {
  visitDetail,
  dcrActions,
  dcrReducer,
  fetchDoctorList,
  fetchEDetailedList,
  fetchOtherProducts,
} from './dcrSlice';

export {dcrSelector} from './dcrSelector';

export {
  fetchDcrWatcher,
  setVisitWatcher,
  getDoctorDataList,
  fetchEdetailedWatcher,
  fetchOtherProductsWatcher,
} from './dcrSaga';
