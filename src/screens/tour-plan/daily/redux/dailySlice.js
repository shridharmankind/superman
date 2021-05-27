import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of doctor details
 */
export const doctorDetailState = {
  doctorDetail: {
    data: [],
  },
};

/**
 *  redux-saga actions
 */
export const fetchDoctorDetailCreator = createAction('FETCH_DOCTOR_DETAIL');
export const fetchDoctorDetailTypeName = fetchDoctorDetailCreator().type;

/**
 *  create doctor detail slice defining the intial state, reducers
 */
export const doctorDetailSlice = createSlice({
  name: 'FETCH_DOCTOR_DETAIL',
  initialState: doctorDetailState,
  reducers: {
    getDoctorDetail: (state, action) => merge(state, action.payload),
  },
});

export const doctorDetailReducer = doctorDetailSlice.reducer;
export const doctorDetailActions = doctorDetailSlice.actions;
