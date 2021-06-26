import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getCompliance = state => {
  return state.planCompliance.rules;
};

const allComplianceRulesSelector = createSelector(
  [getCompliance],
  data => data,
);

const totalPercentSelector = createSelector(
  [getCompliance],
  data => data?.monthly?.totalPercent,
);

// get X value from DOCTORCOVEREDINXDAYS rules
const XMonthValueSelector = createSelector([getCompliance], data => {
  const val = data?.monthly?.rules.filter(
    item => item.rulesShortName === 'DOCTORCOVEREDINXDAYS',
  )[0].ruleValues;
  return val;
});
const warningOnRules = state => state.planCompliance.rules.warningOnRules;

const warningOnRulesSelector = createSelector([warningOnRules], data => data);

export const planComplianceSelector = {
  allComplianceRules: () => allComplianceRulesSelector,
  getTotalPercent: () => totalPercentSelector,
  getWarningOnRules: () => warningOnRulesSelector,
  getXMonthValue: () => XMonthValueSelector,
};
