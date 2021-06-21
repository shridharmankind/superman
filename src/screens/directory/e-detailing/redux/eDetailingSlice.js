import {createAction, createSlice} from '@reduxjs/toolkit';

/* Initial state of priority Product */
export const eDetailingPriorityProduct = {
  detailingPriorityProduct: [],
};

/* Initial state of priority Product */
export const eDetailingOtherProduct = {
  detailingOtherProduct: [],
};

/* Action Creator for Edetailing Priority Products */
export const fetchDetailingPriorityProductCreator = createAction(
  'FETCH_EDETAILING_PRIORITY_PRODUCT',
);
export const fetchDetailingPriorityProductTypeName =
  fetchDetailingPriorityProductCreator().type;

/* Action Creator for Edetailing Priority Products */
export const fetchDetailingOtherProductCreator = createAction(
  'FETCH_EDETAILING_OTHER_PRODUCT',
);
export const fetchDetailingOtherProductTypeName =
  fetchDetailingOtherProductCreator().type;

const ePriorityProductSlice = createSlice({
  name: 'EDETAILING_PRIORITY_PRODUCT',
  initialState: eDetailingPriorityProduct,
  reducers: {
    getDetailingPriorityProduct: (state, action) => {
      return {...state, ...action.payload};
    },
    getMoreDetailingPriorityProduct: (state, action) => {
      return {
        detailingPriorityProduct: [
          ...state.detailingPriorityProduct,
          ...action.payload.detailingPriorityProduct,
        ],
      };
    },
  },
});

export const ePriorityProductActions = ePriorityProductSlice.actions;
export const ePriorityProductReducer = ePriorityProductSlice.reducer;

const eOtherProductSlice = createSlice({
  name: 'EDETAILING_OTHER_PRODUCT',
  initialState: eDetailingOtherProduct,
  reducers: {
    getDetailingOtherProduct: (state, action) => {
      return {...state, ...action.payload};
    },
    getMoreDetailingOtherProduct: (state, action) => {
      return {
        detailingOtherProduct: [
          ...state.detailingOtherProduct,
          ...action.payload.detailingOtherProduct,
        ],
      };
    },
  },
});

export const eOtherProductActions = eOtherProductSlice.actions;
export const eOtherProductReducer = eOtherProductSlice.reducer;
