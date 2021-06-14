import {createAction, createSlice} from '@reduxjs/toolkit';

/* Initial state of tasks */
export const productListState = {
  priorityProduct: [],
};

/* Action Creator */
export const fetchPriorityProductCreator = createAction(
  'FETCH_PRIORITY_PRODUCTS',
);
export const fetchPriorityProductTypeName = fetchPriorityProductCreator().type;

const priorityProductSlice = createSlice({
  name: 'FETCH_PRIORITY_PRODUCTS',
  initialState: productListState,
  reducers: {
    getPriorityProduct: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const priorotyProductActions = priorityProductSlice.actions;
export const priorotyProductReducer = priorityProductSlice.reducer;
