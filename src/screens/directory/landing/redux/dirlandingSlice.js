import {createAction, createSlice} from '@reduxjs/toolkit';

// createed Action
export const fetchSearchDoctors = createAction('FETCH_SEARCH_DOCTORS');
export const fetchSearchDoctorsTypeName = fetchSearchDoctors().type;

export const fetchMissedCallsCreator = createAction('FETCH_MISSED_CALLS');
export const fetchMissedCallsypeName = fetchMissedCallsCreator().type;

export const addPartyToDailyPlanCreator = createAction('ADD_PARTY_TO_DAILY');
export const addPartyToDailyPlanTypeName = addPartyToDailyPlanCreator().type;

export const fetchQueryDoctorsState = {
  docList: {
    searchCount: 0,
    doctors: [],
  },
};

export const landing = {
  parties: {
    missedCalls: [],
    partyMovedToDaily: null,
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
      return {
        ...state,
        parties: {
          ...state.parties,
          missedCalls: [...action.payload.parties.missedCalls],
        },
      };
    },
    addPartyToDailyPlan: (state, action) => {
      console.log('testing action', action);
      const itemToRemoveIdx = state.parties.missedCalls.findIndex(
        party => party.id === action.payload?.partyMovedToDaily?.partyId,
      );
      state.parties.missedCalls.splice(itemToRemoveIdx, 1);
      void (state.parties = {
        missedCalls: [...state.parties.missedCalls],
        partyMovedToDaily: action.payload.partyMovedToDaily,
      });
    },
    resetStateForDailyPlan: (state, action) => {
      return {
        ...state,
        parties: {
          ...state.parties,
          partyMovedToDaily: action.payload,
        },
      };
    },
  },
});

export const searchDoctorActions = searchDoctorSlice.actions;
export const searchDoctorReducer = searchDoctorSlice.reducer;

export const landingActions = landingSlice.actions;
export const landingReducer = landingSlice.reducer;
