import {createSelector} from '@reduxjs/toolkit';

const seniors = state => state.dcrState.seniorList;
const visitors = state => state.dcrState.visitLisit;
const doctors = state => state.dcrState.doctorList;
const selectedData = state => state.dcrState.selectedList;
const eDetailedList = state => state.dcrState.eDetailProducts;
const otherProductList = state => state.dcrState.otherProducts;
const discussedProductList = state => state.dcrState.discussedProduct;

const doctorList = state => state.dcrState.doctors;

const samples = state => state.dcrState.samples;
const selectsamples = state => state.dcrState.selectedSamples;

const items = state => state.dcrState.items;
const selectItems = state => state.dcrState.selectedItems;

const sampleSelector = createSelector([samples], sample => sample);
const selectSampleSelector = createSelector(
  [selectsamples],
  selSample => selSample,
);

const itemSelector = createSelector([items], item => item);
const selectItemSelector = createSelector([selectItems], selItem => selItem);

const seniorListSelector = createSelector([seniors], list => list);
const visitListSelector = createSelector([visitors], list => list);
const docListSelector = createSelector([doctorList], list => list);
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
  getPartyData: () => {
    return docListSelector;
  },
  getSamples: () => {
    return sampleSelector;
  },
  getSelectedSamples: () => {
    return selectSampleSelector;
  },
  getItems: () => {
    return itemSelector;
  },
  getSelectedItems: () => {
    return selectItemSelector;
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
