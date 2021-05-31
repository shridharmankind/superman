import {createSelector} from '@reduxjs/toolkit';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;
const isDoctorDetailFetched = state => state.dailyState.doctorDetail.fetched;

const allDoctorDetailSelector = createSelector([getDoctorDetailList], data =>
  (data || []).slice().sort(sortBasedOnCategory),
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
