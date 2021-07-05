import {createSelector} from '@reduxjs/toolkit';

const seniors = state => state.dcrState.seniorList;
const visitors = state => state.dcrState.visitLisit;
const doctors = state => state.dcrState.doctorList;
const selectedData = state => state.dcrState.selectedList;
const eDetailedList = state => state.dcrState.eDetailProducts;
const otherProductList = state => state.dcrState.otherProducts;
const discussedProductList = state => state.dcrState.discussedProduct;

const seniorListSelector = createSelector([seniors], list => list);
const visitListSelector = createSelector([visitors], list => list);
const docotorListSelector = createSelector([doctors], list => list);
const selectedDocList = createSelector([selectedData], list => list);
const eDetailedAllList = createSelector([eDetailedList], list => list);
const otherProductAllList = createSelector([otherProductList], list => list);
const discussedProducAlltList = createSelector(
  [discussedProductList],
  list => list,
);

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
  getEdtailedList: () => {
    return eDetailedAllList;
  },
  getOtherProductList: () => {
    return otherProductAllList;
  },
  getDiscussedProductList: () => {
    return discussedProducAlltList;
  },
};
