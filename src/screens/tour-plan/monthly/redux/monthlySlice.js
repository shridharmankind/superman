import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state
 */
export const monthlyTourPlan = {
  subOrdinates: {
    data: [],
  },
  workingDay: [],
  stpStatus: null,
  submitSTP: null,
  selectedPlanOption: null,
  mtpData: {data: null, error: null},
};

/**
 *  Action Creator and type to get sub-ordinates of the logged-in staff
 */
export const getSubordinatesCreator = createAction('GET_SUBORDINATES');
export const getSubordinatesTypeName = getSubordinatesCreator().type;

// Action Creatorand type for Working Day
export const fetchWorkingDayCreator = createAction('WORKING_DAY_CREATOR');
export const fetchWorkingDayCreatorType = fetchWorkingDayCreator().type;

// Action Creator and type to get stp status
export const fetchSTPStatusCreator = createAction('STP_STATUS');
export const fetchSTPStatusCreatorType = fetchSTPStatusCreator().type;

// Action Creator and type to submit STP
export const submitSTPCreator = createAction('SUBMIT_STP');
export const submitSTPCreatorType = submitSTPCreator().type;

// Action Creator and type to swap
export const swapCreator = createAction('SWAP');
export const swapCreatorType = swapCreator().type;

// Action Creator and type for MTP Update
export const fetchMTPCalendarUpdateCreator = createAction('MTP_UPDATE_CREATOR');
export const fetchMTPCalendarUpdateCreatorType =
  fetchMTPCalendarUpdateCreator().type;

/**
 *  create subordinate slice defining the intial state, reducers
 */
export const getMonthlySlice = createSlice({
  name: 'MONTHLY_TOUR_PLAN',
  initialState: monthlyTourPlan,
  reducers: {
    getSubordinates: (state, action) => merge(state, action.payload),
    getWorkingDay: (state, action) => {
      return merge(state, action.payload);
    },
    getSTPStatus: (state, action) => merge(state, action.payload),
    submitSTP: (state, action) => merge(state, action.payload),
    setSelectedPlanOption: (state, action) => {
      return {
        ...state,
        selectedPlanOption: action.payload,
      };
    },
    setSTPShowComplete: (state, action) => {
      return {
        ...state,
        submitSTP: {
          ...state.submitSTP,
          messageShown: action.payload,
        },
      };
    },
    setSwap: (state, action) => merge(state, action.payload),
    resetSwap: state => {
      return {
        ...state,
        setSwap: null,
      };
    },
    MTPCalendarUpdate: (state, action) => {
      return {
        ...state,
        mtpData: action.payload.mtpData,
      };
    },
  },
});

export const monthlyReducer = getMonthlySlice.reducer;
export const monthlyActions = getMonthlySlice.actions;
