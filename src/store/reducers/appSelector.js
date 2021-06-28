import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getAppData = state => state.appState;
const staffPositionIdSelector = createSelector(
  [getAppData],
  data => data?.staffPositionId,
);

export const appSelector = {
  getStaffPositionId: () => {
    return staffPositionIdSelector;
  },
};
