import {createSelector} from '@reduxjs/toolkit';

const docCount = state => state.fetchQueryDoctorsState.docList.searchCount;
const docList = state => state.fetchQueryDoctorsState.docList.doctors;

const docListSelector = createSelector([docList], list => list);
const docCountSelector = createSelector([docCount], count => count);

export const searchDocSelector = {
  getSearchDocCount: () => {
    return docCountSelector;
  },
  getSearchDocList: () => {
    return docListSelector;
  },
};
