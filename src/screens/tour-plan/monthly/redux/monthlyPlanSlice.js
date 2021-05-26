import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

const FETCH_MONTHLY_PLAN_ACTION = 'FETCH_MONTHLY_PLAN_ACTION';

/**
 * Initial state of tour plan
 */
export const monthlyPlanState = {
  workingDay: [],
};

// Action Creator
export const fetchWMonthlyPlanCreator = createAction(FETCH_MONTHLY_PLAN_ACTION);

// Action Creator Type
export const fetchWMonthlyPlanCreatorType = fetchWMonthlyPlanCreator().type;

//  slice for working days state
export const monythlyPlanSlice = createSlice({
  name: FETCH_MONTHLY_PLAN_ACTION,
  initialState: monthlyPlanState,
  reducers: {
    getWorkingDay: (state, action) => {
      return merge(state, action.payload);
    },
  },
});

//get reducer and action from slice
export const monthlyPlanReducer = monythlyPlanSlice.reducer;
export const monthlyPlanActions = monythlyPlanSlice.actions;
