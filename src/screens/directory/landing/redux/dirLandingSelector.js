import {createSelector} from '@reduxjs/toolkit';

const docCount = state => state.fetchQueryDoctorsState.docList.searchCount;
const docList = state => state.fetchQueryDoctorsState.docList.doctors;

const missedCallsList = state => state.landing.parties.missedCalls;
const isPartyAddedToDaily = state => state.landing.parties.partyMovedToDaily;

const docListSelector = createSelector([docList], list => list);
const docCountSelector = createSelector([docCount], count => count);
const missedCallsSelector = createSelector([missedCallsList], list => list);
const isPartyAddedToDailySelector = createSelector(
  [isPartyAddedToDaily],
  data => data,
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
