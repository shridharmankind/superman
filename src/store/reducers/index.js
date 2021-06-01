import {combineReducers} from 'redux';
import {updateTodoDataReducer} from './../../screens/generic/Reference/redux/todoSlice';
import {fetchStatusSliceReducer} from './appSlice';
import {doctorDetailReducer} from 'screens/tourPlan/daily/redux';
import {monthlyReducer} from 'screens/tourPlan/monthly/redux/monthlySlice';
import {standardPlanReducer} from 'screens/tourPlan/standard/redux/standardSlice';

export const rootReducer = combineReducers({
  todoState: updateTodoDataReducer,
  appState: fetchStatusSliceReducer,
  dailyState: doctorDetailReducer,
  monthlyState: monthlyReducer,
  standardPlan: standardPlanReducer,
});

export {fetchStatusSliceActions, FetchEnumStatus} from './appSlice';
