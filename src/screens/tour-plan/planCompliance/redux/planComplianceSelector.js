import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getCompliance = state => state.planCompliance.rules.data;

const allComplianceRulesSelector = createSelector([getCompliance], data => {
  return data;
});

export const planComplianceSelector = {
  allComplianceRules: () => {
    return allComplianceRulesSelector;
  },
};
