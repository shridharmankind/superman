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

const totalPercentSelector = createSelector([getCompliance], data => {
  const totalPercent = data?.monthly?.totalPercent;
  return Number.isInteger(totalPercent)
    ? totalPercent
    : totalPercent?.toFixed(1);
});

const gapRuleSelector = createSelector(
  [getCompliance],
  data => data?.gapRuleErrorCode,
);
// get X value from DOCTORCOVEREDINXDAYS rules
const XMonthValueSelector = createSelector([getCompliance], data => {
  const val =
    data &&
    data?.monthly?.rules?.filter(
      item => item.rulesShortName === 'DOCTORCOVEREDINXDAYS',
    );
  return val && val[0]?.ruleValues;
});
const warningOnRules = state => state.planCompliance.rules.warningOnRules;

const warningOnRulesSelector = createSelector([warningOnRules], data => data);

export const planComplianceSelector = {
  allComplianceRules: () => allComplianceRulesSelector,
  getTotalPercent: () => totalPercentSelector,
  getWarningOnRules: () => warningOnRulesSelector,
  getXMonthValue: () => XMonthValueSelector,
  getGapRuleError: () => gapRuleSelector,
};
