import {createSlice} from '@reduxjs/toolkit';
import {Constants} from 'common';

export const FetchEnumStatus = {
  INITIAL: 'INITIAL',
  FETCHING: 'FETCHING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
};

export const fetchStatusActionType = FetchEnumStatus;

const initialState = {
  appStatus: FetchEnumStatus.INITIAL,
  staffPositionId: null,
  syncStatus: Constants.BACKGROUND_TASK.NOT_RUNNING,
  syncCompletionStatus: '',
};

export const fetchStatusSlice = createSlice({
  name: 'app/fetchStatus',
  initialState,
  reducers: {
    /**
     *
     *  a property name gonna be the name of action
     *  its value is the reduce
     *
     *  If you need to define the param of the action, use PayloadAction<X> to define its type.
     *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
     *
     **/
    update: (state, action) => {
      return {
        ...state,
        appStatus: action.payload,
      };
    },
    clear: state => {
      return {
        ...state,
        appStatus: FetchEnumStatus.INITIAL,
      };
    },
    setStaffPositionId: (state, action) => {
      return {...state, staffPositionId: action.payload};
    },
    setSyncStatus: (state, action) => {
      return {...state, syncStatus: action.payload};
    },
    setSyncCompletionStatus: (state, action) => {
      return {...state, syncCompletionStatus: action.payload};
    },
  },
});

export const fetchStatusSliceReducer = fetchStatusSlice.reducer;
export const fetchStatusSliceActions = fetchStatusSlice.actions;
