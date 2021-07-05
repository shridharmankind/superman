import {createSelector} from '@reduxjs/toolkit';

const docCount = state => state.fetchQueryDoctorsState.docList.searchCount;
const docList = state => state.fetchQueryDoctorsState.docList.doctors;

const partiesData = state => state.landing.parties;

const docListSelector = createSelector([docList], list => list);
const docCountSelector = createSelector([docCount], count => count);
const missedCallsSelector = createSelector(
  [partiesData],
  data => data?.missedCalls,
);
const isPartyAddedToDailySelector = createSelector(
  [partiesData],
  data => data?.partyMovedToDaily,
);

export const searchDocSelector = {
  getSearchDocCount: () => {
    return docCountSelector;
  },
  getSearchDocList: () => {
    return docListSelector;
  },
};

export const partySelector = {
  getMissedCallsList: () => {
    return missedCallsSelector;
  },
  isPartyMovedToDaily: () => {
    return isPartyAddedToDailySelector;
  },
};
