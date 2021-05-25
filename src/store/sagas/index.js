import {all, call, spawn} from 'redux-saga/effects';
import {fetchTodoWatcher} from './../../screens/generic/Reference/redux/todoSaga';
import {fetchDoctorDetailWatcher} from 'screens/tourPlan/daily/redux';
// import {fetchDoctorDetailWatcher} from '../../screens/tour-plan/redux/dailySaga';

export function* rootSaga() {
  /**
   *
   *  Register watchers
   *
   */
  const sagas = [fetchTodoWatcher, fetchDoctorDetailWatcher];

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
