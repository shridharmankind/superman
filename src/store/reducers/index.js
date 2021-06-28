import {combineReducers} from 'redux';
import {updateTodoDataReducer} from './../../screens/generic/Reference/redux/todoSlice';
import {fetchStatusSliceReducer} from './appSlice';
import {doctorDetailReducer} from 'screens/tourPlan/daily/redux';
import {monthlyReducer} from 'screens/tourPlan/monthly/redux/monthlySlice';
import {standardPlanReducer} from 'screens/tourPlan/standard/redux/standardSlice';
import {openTasksReducer} from 'screens/directory/doctorDetails/openTask/redux';
import {priorityProductReducer} from 'screens/directory/priorityProduct/redux';
import {planComplianceReducer} from 'screens/tourPlan/planCompliance/redux';
import {searchDoctorReducer} from 'screens/directory/landing/redux';
import {
  ePriorityProductReducer,
  eOtherProductReducer,
} from 'screens/directory/e-detailing/redux';
import {timelineReducer} from 'screens/directory/doc-timeline/redux';

export const rootReducer = combineReducers({
  todoState: updateTodoDataReducer,
  appState: fetchStatusSliceReducer,
  dailyState: doctorDetailReducer,
  monthlyState: monthlyReducer,
  standardPlan: standardPlanReducer,
  openTaskState: openTasksReducer,
  productList: priorityProductReducer,
  planCompliance: planComplianceReducer,
  fetchQueryDoctorsState: searchDoctorReducer,
  ePriorityProductList: ePriorityProductReducer,
  eOtherProductList: eOtherProductReducer,
  timeline: timelineReducer,
});

export {fetchStatusSliceActions, FetchEnumStatus} from './appSlice';
export {appSelector} from './appSelector';
