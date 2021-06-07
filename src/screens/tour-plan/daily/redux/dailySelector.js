import {createSelector} from '@reduxjs/toolkit';
import {sortByCategory} from 'screens/tourPlan/helper';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;

const allDoctorDetailSelector = createSelector([getDoctorDetailList], data => {
  return sortByCategory(data);
});

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
};
