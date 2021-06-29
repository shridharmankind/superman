import {createSelector} from '@reduxjs/toolkit';

const getFetch = state => state.appState.appStatus;
const getFetchState = createSelector([getFetch], fetch =>
  fetch === {} ? 'FETCHING' : fetch,
);

const getAppData = state => state.appState;
const staffPositionIdSelector = createSelector(
  [getAppData],
  data => data?.staffPositionId,
);

export const appSelector = {
  //App state
  makeGetAppFetch: () => {
    return getFetchState;
  },
  getStaffPositionId: () => {
    return staffPositionIdSelector;
  },
};
