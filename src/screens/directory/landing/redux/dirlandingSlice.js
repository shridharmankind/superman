import {createAction, createSlice} from '@reduxjs/toolkit';

// createed Action
export const fetchSearchDoctors = createAction('FETCH_SEARCH_DOCTORS');
export const fetchSearchDoctorsTypeName = fetchSearchDoctors().type;

export const fetchQueryDoctorsState = {
  docList: {
    searchCount: 0,
    doctors: [],
  },
};

const searchDoctorSlice = createSlice({
  name: 'SEARCH_DOCTORS',
  initialState: fetchQueryDoctorsState,
  reducers: {
    getDoctors: (state, action) => {
      return {...state, ...action.payload};
    },
    getMoreDoctors: (state, action) => {
      return {
        ...state,
        docList: {
          searchCount: action.payload.docList.searchCount,
          doctors: [
            ...state.docList.doctors,
            ...action.payload.docList.doctors,
          ],
        },
      };
    },
  },
});

export const searchDoctorActions = searchDoctorSlice.actions;
export const searchDoctorReducer = searchDoctorSlice.reducer;
