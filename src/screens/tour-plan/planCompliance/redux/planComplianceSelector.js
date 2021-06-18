import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getCompliance = state => state.planCompliance.rules.data;

const allComplianceRulesSelector = createSelector(
  [getCompliance],
  data => data,
);

const totalPercentSelector = createSelector(
  [getCompliance],
  data => data.totalPercent,
);

export const planComplianceSelector = {
  allComplianceRules: () => allComplianceRulesSelector,
  getTotalPercent: () => totalPercentSelector,
};
