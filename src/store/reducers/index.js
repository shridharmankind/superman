import { combineReducers } from 'redux';
import { updateTodoDataReducer } from './../../screens/generic/Reference/redux/todoSlice';
import { fetchStatusSliceReducer } from './appSlice';

// ** REFACTOR to new approach **/
export const rootReducer = combineReducers({
    todoState: updateTodoDataReducer,
    appState: fetchStatusSliceReducer
})

export { fetchStatusSliceActions, FetchEnumStatus } from './appSlice';