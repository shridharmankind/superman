import {combineReducers} from 'redux';
import {updateTodoDataReducer} from './../../screens/generic/Reference/redux/todoSlice';
import {fetchStatusSliceReducer} from './appSlice';
import {doctorDetailReducer} from 'screens/tourPlan/daily/redux';
import {subOrdinateReducer} from 'screens/tourPlan/monthly/redux';

// ** REFACTOR to new approach **/
export const rootReducer = combineReducers({
  todoState: updateTodoDataReducer,
  appState: fetchStatusSliceReducer,
  dailyState: doctorDetailReducer,
  monthlyState: subOrdinateReducer,
});

export {fetchStatusSliceActions, FetchEnumStatus} from './appSlice';
