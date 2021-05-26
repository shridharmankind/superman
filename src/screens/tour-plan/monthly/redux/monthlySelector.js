import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getSubordinateList = state => state.monthlyState.subOrdinates.data;

const allSubOrdinatesSelector = createSelector(
  [getSubordinateList],
  data => data,
);

export const monthlyTourPlanSelector = {
  allSubOrdinates: () => {
    return allSubOrdinatesSelector;
  },
};
