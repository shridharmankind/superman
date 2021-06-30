import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of doctor details
 */
export const settingDetailState = {
  settingDetails: {
    conflictScreen: {
      data: [],
    },
  },
};

/**
 *  create daily plan slice defining the intial state, reducers
 */
export const doctorDetailSlice = createSlice({
  name: 'SETTING_DETAIL',
  initialState: settingDetailState,
  reducers: {},
});

export const doctorDetailReducer = doctorDetailSlice.reducer;
export const doctorDetailActions = doctorDetailSlice.actions;
