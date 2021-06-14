import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of plan compliance
 */
export const planComplianceState = {
  rules: {
    data: {},
    error: null,
  },
};

/**
 *  Action creator and type to fetch rules of compliance
 */
export const fetchPlanComplianceCreator = createAction('FETCH_PLAN_COMPLIANCE');
export const fetchPlanComplianceTypeName = fetchPlanComplianceCreator().type;

/**
 *  create daily plan slice defining the intial state, reducers
 */
export const planComplianceSlice = createSlice({
  name: 'PLAN_COMPLIANCE',
  initialState: planComplianceState,
  reducers: {
    getComplainceRules: (state, action) => merge(state, action.payload),
  },
});

export const planComplianceReducer = planComplianceSlice.reducer;
export const planComplianceActions = planComplianceSlice.actions;
