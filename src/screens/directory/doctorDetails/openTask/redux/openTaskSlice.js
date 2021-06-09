import {createAction, createSlice} from '@reduxjs/toolkit';

/* Initial state of tasks */
export const openTaskState = {
  task: {
    count: 0,
    opentasks: [],
  },
};

/* Action Creator */
export const fetchOpenTasksCreator = createAction('FETCH_OPEN_TASKS');
export const fetchOpenTasksTypeName = fetchOpenTasksCreator().type;

const taskSlice = createSlice({
  name: 'OPEN_TASK',
  initialState: openTaskState,
  reducers: {
    getOpenTasks: (state, action) => {
      return {...state, ...action.payload};
    },
    getMoreTasks: (state, action) => {
      return {
        task: {
          count: action.payload.task.count,
          opentasks: [
            ...state.task.opentasks,
            ...action.payload.task.opentasks,
          ],
        },
      };
    },
  },
});

export const openTaskActions = taskSlice.actions;
export const openTasksReducer = taskSlice.reducer;
