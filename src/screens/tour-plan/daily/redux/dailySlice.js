import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state of doctor details
 */
export const doctorDetailState = {
  doctorDetail: {
    data: [],
    deletedItem: {},
    error: '',
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
    getDoctorDetail: (state, action) =>
      void (state.doctorDetail.data = [...action.payload.doctorDetail.data]),
    tempStoreRemovedDoctor: (state, action) => {
      const itemIndexToRemove = state.doctorDetail.data.findIndex(d => {
        return d.id === action.payload.partyId;
      });
      state.doctorDetail.deletedItem = {
        item: state.doctorDetail.data.slice(
          itemIndexToRemove,
          itemIndexToRemove + 1,
        )[0],
        index: itemIndexToRemove,
      };
      state.doctorDetail.data.splice(itemIndexToRemove, 1);
    },
    doctorRemoved: (state, action) => {
      void (state.doctorDetail.data = [...state.doctorDetail.data]);
    },
    addDeletedParty: (state, action) => {
      const findItemToAdd = state.doctorDetail.data.find(d => {
        return d.id === state.doctorDetail.deletedItem.item.id;
      });
      if (!findItemToAdd) {
        state.doctorDetail.data.splice(
          state.doctorDetail.deletedItem.index,
          0,
          state.doctorDetail.deletedItem.item,
        );
      }
    },
    deletePartyError: (state, action) => merge(state, action.payload),
  },
});

export const doctorDetailReducer = doctorDetailSlice.reducer;
export const doctorDetailActions = doctorDetailSlice.actions;
