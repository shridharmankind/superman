import {createSelector} from '@reduxjs/toolkit';
import {getFormatDate} from 'utils/dateTimeHelper';
/**
 * selector function to retrieve data from redux store
 **/

const getMonthlyState = state => state.monthlyState;

const getMTPDataSelector = createSelector([getMonthlyState], data => {
  return data?.mtpData?.data;
});

const workingDaySelector = createSelector(
  [getMonthlyState],
  data => data?.workingDay,
);

const getSubordinateList = state => state.monthlyState.subOrdinates.data;
const allSubOrdinatesSelector = createSelector(
  [getSubordinateList],
  data => data,
);

const stpStatus = state => state.monthlyState.stpStatus;
const stpStatusSelector = createSelector([stpStatus], data => data);

const tourPlanStatusThresholdSelector = createSelector([stpStatus], data => {
  const nextMonth = parseInt(getFormatDate({format: 'M'}), 10) + 1;
  const upcomingMonthStatus = data?.monthlyTourPlanStatuses?.filter(
    monthStatus => {
      return monthStatus?.month === nextMonth;
    },
  );

  if (upcomingMonthStatus?.length > 0) {
    return upcomingMonthStatus[0];
  } else {
    return null;
  }
});

const submitSTP = state => state.monthlyState.submitSTP;
const submitSTPSelector = createSelector([submitSTP], data => data);

const selectedPlanOptionSelector = createSelector(
  [getMonthlyState],
  data => data?.selectedPlanOption,
);

const setSwap = state => state.monthlyState.setSwap;
const setSwapSelector = createSelector([setSwap], data => data);

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
  submitSTP: () => {
    return submitSTPSelector;
  },
  selectedPlanOption: () => {
    return selectedPlanOptionSelector;
  },
  setSwap: () => {
    return setSwapSelector;
  },
  getMTPData: () => getMTPDataSelector,

  getUpcomingMonthStatus: () => tourPlanStatusThresholdSelector,
};
