import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;
const isDoctorDetailFetched = state => state.dailyState.doctorDetail.fetched;

const allDoctorDetailSelector = createSelector(
  [getDoctorDetailList],
  data => data,
);

const isDoctorDetailReceived = createSelector(
  [isDoctorDetailFetched],
  isFetched => isFetched,
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
  isDoctorDetailReceived: () => {
    return isDoctorDetailReceived;
  },
};
