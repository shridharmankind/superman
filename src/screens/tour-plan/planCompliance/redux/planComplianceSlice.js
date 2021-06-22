import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';
import {ARRAY_OPERATION} from 'screens/tourPlan/constants';

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
      const {rule, operation} = action.payload;

      const findRule = state.rules.warningOnRules.findIndex(r => {
        return rule.subTitle === r.subTitle;
      });
      if (operation === ARRAY_OPERATION.PUSH && findRule === -1) {
        state.rules.warningOnRules.push(rule);
      } else if (operation === ARRAY_OPERATION.POP && findRule >= 0) {
        state.rules.warningOnRules.splice(findRule, 1);
      }
      return state;
    },
  },
});

export const planComplianceReducer = planComplianceSlice.reducer;
export const planComplianceActions = planComplianceSlice.actions;
