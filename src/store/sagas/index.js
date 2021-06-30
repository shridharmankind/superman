import {all, call, spawn} from 'redux-saga/effects';
import {fetchTodoWatcher} from './../../screens/generic/Reference/redux/todoSaga';
import {
  fetchDoctorDetailWatcher,
  deletePartyWatcher,
} from 'screens/tourPlan/daily/redux';
import {
  fetchSubOrdinatesWatcher,
  fetchWorkingDayWatcher,
  fetchSTPStatusWatcher,
  submitSTPWatcher,
  setSwapWatcher,
} from 'screens/tourPlan/monthly/redux';
import {
  fetchPartiesWatcher,
  fetchAreasWatcher,
  fetchPatchesWatcher,
  fetchPartiesByPatchIdWatcher,
  savePatchWatcher,
  fetchSTPCalendarUpdateWatcher,
} from 'screens/tourPlan/standard/redux';
import {fetchPlanComplianceWatcher} from 'screens/tourPlan/planCompliance/redux';
import {fetchTaskWatcher} from 'screens/directory/doctorDetails/openTask/redux';
import {
  fetchQueryDoctorsWatcher,
  fetchMissedCallsWatcher,
  addPartyToDailyPlanWatcher,
} from 'screens/directory/landing/redux';
import {fetchPriorityProductWatcher} from 'screens/directory/priorityProduct/redux';
import {fetchTimelineWatcher} from 'screens/directory/doc-timeline/redux';
import {
  fetchEDetailingOtherProductWatcher,
  fetchEDetailingPriorityProductWatcher,
} from 'screens/directory/e-detailing/redux';

export function* rootSaga() {
  /**
   *
   *  Register watchers
   *
   */
  const sagas = [
    fetchTodoWatcher,
    fetchDoctorDetailWatcher,
    fetchSubOrdinatesWatcher,
    fetchWorkingDayWatcher,
    fetchSTPStatusWatcher,
    submitSTPWatcher,
    fetchPartiesWatcher,
    fetchAreasWatcher,
    fetchPatchesWatcher,
    fetchPartiesByPatchIdWatcher,
    savePatchWatcher,
    deletePartyWatcher,
    fetchTaskWatcher,
    fetchPriorityProductWatcher,
    fetchSTPCalendarUpdateWatcher,
    fetchPlanComplianceWatcher,
    fetchQueryDoctorsWatcher,
    fetchMissedCallsWatcher,
    addPartyToDailyPlanWatcher,
    fetchEDetailingPriorityProductWatcher,
    fetchEDetailingOtherProductWatcher,
    fetchTimelineWatcher,
    setSwapWatcher,
  ];

  /**
   * keep everything (e.g., child tasks) alive
   *
   **/
  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log('Error ', e);
          }
        }
      }),
    ),
  );
}
