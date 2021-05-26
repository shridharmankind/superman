import {combineReducers} from 'redux';
import {updateTodoDataReducer} from './../../screens/generic/Reference/redux/todoSlice';
import {fetchStatusSliceReducer} from './appSlice';
import {doctorDetailReducer} from 'screens/tourPlan/daily/redux';
import {monthlyPlanReducer} from 'screens/tourPlan/monthly/redux';

//Combine Reducer
export const rootReducer = combineReducers({
  todoState: updateTodoDataReducer,
  appState: fetchStatusSliceReducer,
  dailyState: doctorDetailReducer,
  monthlyPlanState: monthlyPlanReducer,
});

export {fetchStatusSliceActions, FetchEnumStatus} from './appSlice';
