import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/
const workingDayList = state => state.monthlyPlanState.workingDay;

const workingDaySelector = createSelector([workingDayList], data => data);

export const monthlyPlanSelector = {
  allWorkingDay: () => {
    return workingDaySelector;
  },
};
