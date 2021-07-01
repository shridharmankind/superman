import {createSlice, createAction} from '@reduxjs/toolkit';

export const searchSamples = createAction('SEARCH_SAMPLES');
export const searchSamplesType = searchSamples().type;

export const selectSamples = createAction('SELECT_SAMPLES');
export const selectSamplesType = selectSamples().type;

const sampleList = {
  samples: [],
  selectedSamples: [],
};

const searchSampleSlice = createSlice({
  name: 'SEARCH_SAMPLES_SLICE',
  initialState: sampleList,
  reducers: {
    getSamples: (state, action) => {
      return {...state, ...action.payload};
    },
    selectSamples: (state, action) => {
      return {...state, ...action.payload};
    },
    clearSelectedSamples: state => {
      return {...state, selectedSamples: []};
    },
  },
});

export const searchSamplesActions = searchSampleSlice.actions;
export const searchSamplesReducer = searchSampleSlice.reducer;
