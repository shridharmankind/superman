import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;

const allDoctorDetailSelector = createSelector(
  [getDoctorDetailList],
  data => data,
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
};
