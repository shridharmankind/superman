import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of doctor details
 */
export const doctorDetailState = {
  doctorDetail: {
    data: [],
    fetched: false,
  },
};

/**
 *  Action creator and type to fetch parties list
 */
export const fetchDoctorDetailCreator = createAction('FETCH_DOCTOR_DETAIL');
export const fetchDoctorDetailTypeName = fetchDoctorDetailCreator().type;

/**
 *  Action creator and type to delete a party
 */
export const deletePartyCreator = createAction('REMOVE_PARTY');
export const deletePartyTypeName = deletePartyCreator().type;

/**
 *  create daily plan slice defining the intial state, reducers
 */
export const doctorDetailSlice = createSlice({
  name: 'DAILY_PLAN',
  initialState: doctorDetailState,
  reducers: {
    getDoctorDetail: (state, action) => merge(state, action.payload),
    doctorRemoved: (state, action) =>
      state.doctorDetail.data.filter(d => d.id === action.id),
  },
});

export const doctorDetailReducer = doctorDetailSlice.reducer;
export const doctorDetailActions = doctorDetailSlice.actions;
