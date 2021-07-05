import {createSelector} from '@reduxjs/toolkit';

const seniors = state => state.dcrState.seniorList;
const visitors = state => state.dcrState.visitLisit;
const doctors = state => state.dcrState.doctorList;
const selectedData = state => state.dcrState.selectedList;

const seniorListSelector = createSelector([seniors], list => list);
const visitListSelector = createSelector([visitors], list => list);
const docotorListSelector = createSelector([doctors], list => list);
const selectedDocList = createSelector([selectedData], list => list);
export const dcrSelector = {
  getSeniors: () => {
    return seniorListSelector;
  },
  getVisitors: () => {
    return visitListSelector;
  },
  getDoctors: () => {
    return docotorListSelector;
  },
  getSelectedDoc: () => {
    return selectedDocList;
  },
};
