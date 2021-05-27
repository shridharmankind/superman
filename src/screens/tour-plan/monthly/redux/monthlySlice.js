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
};

/**
 *  redux-saga actions
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
  name: 'GET_SUBORDINATES',
  initialState: monthlyTourPlan,
  reducers: {
    getSubordinates: (state, action) => merge(state, action.payload),
    getWorkingDay: (state, action) => {
      return merge(state, action.payload);
    },
  },
});

export const monthlyReducer = getMonthlySlice.reducer;
export const monthlyActions = getMonthlySlice.actions;
