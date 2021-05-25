import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

export const doctorDetailState = {
  doctorDetail: {
    data: [],
  },
};

/**
 *  redux-saga actions
 *  - use this in index.js at watchers
 */
export const fetchDoctorDetailCreator = createAction('FETCH_DOCTOR_DETAIL');
export const fetchDoctorDetailTypeName = fetchDoctorDetailCreator().type;

export const doctorDetailSlice = createSlice({
  name: 'FETCH_DOCTOR_DETAIL',
  initialState: doctorDetailState,
  reducers: {
    getDoctorDetail: (state, action) => merge(state, action.payload),
  },
});

export const doctorDetailReducer = doctorDetailSlice.reducer;
export const doctorDetailActions = doctorDetailSlice.actions;
