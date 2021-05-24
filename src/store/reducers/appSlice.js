import { createSlice } from '@reduxjs/toolkit'

export const FetchEnumStatus = {
    INITIAL: "INITIAL",
    FETCHING: "FETCHING",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS",
}

export const fetchStatusActionType = FetchEnumStatus;

export const fetchStatusSlice = createSlice({
    name: 'app/fetchStatus',
    initialState: {},
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
        update: (state, action) => action.payload,
        clear: () => FetchStatusEnum.INITIAL,
    }
})

export const fetchStatusSliceReducer = fetchStatusSlice.reducer;
export const fetchStatusSliceActions = fetchStatusSlice.actions;