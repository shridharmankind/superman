import {
    createAction,
    createSlice
} from '@reduxjs/toolkit';
import { merge } from 'lodash';
import {todoState} from 'states';

/**
 *  redux-saga actions
 *  - use this in index.js at watchers
 */
export const fetchTodoActionCreator = createAction("TODO_FETCH_PAGE");
export const fetchTodoActionTypeName = fetchTodoActionCreator().type;

export const updateTodoDataSlice = createSlice({
    name: 'FETCH_TODO',
    initialState: todoState,
    reducers: {
        /**
         *
         *  a property name gonna be the name of action
         *  its value is the reduce
         *
         *  If you need to define the param of the action, use PayloadAction<X> to define its type.
         *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
         *
         **/
        merge: (state, action) => merge(state, action.payload),
        update: (state, action) => {
            state.todos.selected = action.payload
        },
        clear: (state) => "",
    }
});

export const updateTodoDataReducer = updateTodoDataSlice.reducer
export const updateTodoDataActions = updateTodoDataSlice.actions