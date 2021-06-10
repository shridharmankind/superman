import {createSelector} from '@reduxjs/toolkit';
import {sortByCategory} from 'screens/tourPlan/helper';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;

const doctorDetailRemoveError = state => state.dailyState.doctorDetail.error;

const allDoctorDetailSelector = createSelector([getDoctorDetailList], data => {
  return sortByCategory(data);
});

const doctorDetailErrorSelector = createSelector(
  [doctorDetailRemoveError],
  data => {
    return data;
  },
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
  doctorDetailError: () => {
    return doctorDetailErrorSelector;
  },
};
