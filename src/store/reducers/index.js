import { combineReducers } from 'redux';
import { updateTodoDataReducer } from './todoSlice';
import { fetchStatusSliceReducer } from './appSlice';

// ** REFACTOR to new approach **/
export const rootReducer = combineReducers({
    todoState: updateTodoDataReducer,
    appState: fetchStatusSliceReducer
})

export { fetchStatusSliceActions } from './appSlice';
export { updateTodoDataActions, fetchTodoActionCreator, fetchTodoActionTypeName } from './todoSlice';