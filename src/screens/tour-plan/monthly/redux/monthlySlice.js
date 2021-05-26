import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

const FETCH_WORKING_DAY_ACTION = 'FETCH_WORKING_DAY_ACTION';
/**
 * Initial state of tour plan
 */
export const monthlyPlanState = {
  workingDay: {
    data: [],
  },
};

// redux sage action creator
export const fetchWorkingDayAction = createAction(FETCH_WORKING_DAY_ACTION);

// redux sage action type
export const fetchWorkingDayActionType = fetchWorkingDayAction().type;

//  slice for working days state
export const monythlyPlanSlice = createSlice({
  name: FETCH_WORKING_DAY_ACTION,
  initialState: monthlyPlanState,
  reducers: {
    getWorkingDay: (state, action) => merge(state, action.payload),
  },
});

//get reducer and action from slice
export const monthlyPlanReducer = monythlyPlanSlice.reducer;
export const monthlyPlanActions = monythlyPlanSlice.actions;
