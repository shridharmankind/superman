import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of plan compliance
 */
export const planComplianceState = {
  rules: {
    monthly: {},
    daily: {},
    error: null,
    warningOnRules: [],
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
    collectWarningOnRules: (state, action) => {
      state.rules.warningOnRules.push(action.payload);
      console.log(
        'action',
        action.payload,
        JSON.stringify(state.rules.warningOnRules),
      );

      return state;
    },
  },
});

export const planComplianceReducer = planComplianceSlice.reducer;
export const planComplianceActions = planComplianceSlice.actions;
