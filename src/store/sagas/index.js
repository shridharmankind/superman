import {all, call, spawn} from 'redux-saga/effects';
import {fetchTodoWatcher} from './../../screens/generic/Reference/redux/todoSaga';
import {
  fetchDoctorDetailWatcher,
  deletePartyWatcher,
} from 'screens/tourPlan/daily/redux';
import {
  fetchSubOrdinatesWatcher,
  fetchWorkingDayWatcher,
} from 'screens/tourPlan/monthly/redux';
import {
  fetchPartiesWatcher,
  fetchAreasWatcher,
  fetchPatchesWatcher,
  fetchPartiesByPatchIdWatcher,
  savePatchWatcher,
} from 'screens/tourPlan/standard/redux';
import {fetchTaskWatcher} from 'screens/directory/doctorDetails/openTask/redux';
import {fetchTimelineWatcher} from 'screens/directory/doc-timeline/redux';

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
    fetchPartiesWatcher,
    fetchAreasWatcher,
    fetchPatchesWatcher,
    fetchPartiesByPatchIdWatcher,
    savePatchWatcher,
    deletePartyWatcher,
    fetchTaskWatcher,
    fetchTimelineWatcher,
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
