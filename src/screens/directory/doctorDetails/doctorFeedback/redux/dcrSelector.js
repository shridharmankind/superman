import {createSelector} from '@reduxjs/toolkit';

const seniors = state => state.dcrState.seniorList;
const visitors = state => state.dcrState.visitLisit;

const seniorListSelector = createSelector([seniors], list => list);
const visitListSelector = createSelector([visitors], list => list);

export const dcrSelector = {
  getSeniors: () => {
    return seniorListSelector;
  },
  getVisitors: () => {
    return visitListSelector;
  },
};
