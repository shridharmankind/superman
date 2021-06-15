import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const visitList = state => state.timeline.data;
const visitsSelector = createSelector([visitList], visit => visit);

export const timelineSelector = {
  getVisits: () => {
    return visitsSelector;
  },
};
