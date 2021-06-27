import {createAction, createSlice} from '@reduxjs/toolkit';

// createed Action
export const fetchSearchDoctors = createAction('FETCH_SEARCH_DOCTORS');
export const fetchSearchDoctorsTypeName = fetchSearchDoctors().type;

export const fetchMissedCallsCreator = createAction('FETCH_MISSED_CALLS');
export const fetchMissedCallsypeName = fetchMissedCallsCreator().type;

export const fetchQueryDoctorsState = {
  docList: {
    searchCount: 0,
    doctors: [],
  },
};

export const landing = {
  parties: {
    missedCalls: [],
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
    clearSearch: () => {
      return {docList: {searchCount: 0, doctors: []}};
    },
  },
});

const landingSlice = createSlice({
  name: 'LANDING',
  initialState: landing,
  reducers: {
    getMissedCalls: (state, action) => {
      return state;
    },
  },
});

export const searchDoctorActions = searchDoctorSlice.actions;
export const searchDoctorReducer = searchDoctorSlice.reducer;

export const landingActions = landingSlice.actions;
export const landingReducer = landingSlice.reducer;
