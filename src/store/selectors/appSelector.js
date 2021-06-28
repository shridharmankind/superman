import {createSelector} from '@reduxjs/toolkit';

const getFetch = state => state.appState;

const getFetchState = createSelector([getFetch], fetch =>
  fetch === {} ? 'FETCHING' : fetch,
);

export const appSelectors = {
  //App state
  makeGetAppFetch: () => {
    return getFetchState;
  },
};
