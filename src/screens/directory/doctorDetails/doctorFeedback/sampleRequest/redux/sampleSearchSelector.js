import {createSelector} from '@reduxjs/toolkit';

const samples = state => state.sampleList.samples;
const selectsamples = state => state.sampleList.selectedSamples;

const sampleSelector = createSelector([samples], sample => sample);
const selectSampleSelector = createSelector(
  [selectsamples],
  selSample => selSample,
);

export const searchSampleSelector = {
  getSamples: () => {
    return sampleSelector;
  },
  getSelectedSamples: () => {
    return selectSampleSelector;
  },
};
