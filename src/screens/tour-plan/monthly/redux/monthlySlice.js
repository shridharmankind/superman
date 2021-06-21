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
  selectedPlanOption: null,
};

/**
 *  Action Creator and type to get sub-ordinates of the logged-in staff
 */
export const getSubordinatesCreator = createAction('GET_SUBORDINATES');
export const getSubordinatesTypeName = getSubordinatesCreator().type;

// Action Creatorand type for Working Day
export const fetchWorkingDayCreator = createAction('WORKING_DAY_CREATOR');
export const fetchWorkingDayCreatorType = fetchWorkingDayCreator().type;

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
    setSelectedPlanOption: (state, action) => {
      return {
        ...state,
        selectedPlanOption: action.payload,
      };
    },
  },
});

export const monthlyReducer = getMonthlySlice.reducer;
export const monthlyActions = getMonthlySlice.actions;
