import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getWorkingDay = state => state.monthlyPlanState.workingDay;

const allDoctorDetailSelector = createSelector(
  [getDoctorDetailList],
  data => data,
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
};
