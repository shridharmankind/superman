import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getSubordinateList = state => state.monthlyState.subOrdinates.data;

const allSubOrdinatesSelector = createSelector(
  [getSubordinateList],
  data => data,
);
const workingDayList = state => state.monthlyState.workingDay;

const workingDaySelector = createSelector([workingDayList], data => data);

const stpStatus = state => state.monthlyState.stpStatus;

const stpStatusSelector = createSelector([stpStatus], data => data);

export const monthlyTourPlanSelector = {
  allSubOrdinates: () => {
    return allSubOrdinatesSelector;
  },
  allWorkingDay: () => {
    return workingDaySelector;
  },
  getSTPStatus: () => {
    return stpStatusSelector;
  },
};
