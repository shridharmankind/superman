import {createSelector} from '@reduxjs/toolkit';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;

const allDoctorDetailSelector = createSelector([getDoctorDetailList], data =>
  (data || []).slice().sort(sortBasedOnCategory),
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
};
