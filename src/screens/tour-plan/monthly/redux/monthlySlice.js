import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';
import {GET_SUBORDINATES} from 'screens/tourPlan/actionConstants';

/**
 * Initial state
 */
export const monthlyTourPlan = {
  subOrdinates: {
    data: [],
  },
};

/**
 *  redux-saga actions
 */
export const getSubordinatesCreator = createAction(GET_SUBORDINATES);
export const getSubordinatesTypeName = getSubordinatesCreator().type;

/**
 *  create subordinate slice defining the intial state, reducers
 */
export const getSubordinateSlice = createSlice({
  name: GET_SUBORDINATES,
  initialState: monthlyTourPlan,
  reducers: {
    getSubordinates: (state, action) => merge(state, action.payload),
  },
});

export const subOrdinateReducer = getSubordinateSlice.reducer;
export const subOrdinateActions = getSubordinateSlice.actions;
