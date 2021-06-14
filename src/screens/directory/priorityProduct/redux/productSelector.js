import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const productList = state => {
  return state.productListState.priorityProduct;
};

const priorityProductsSelector = createSelector([productList], task => task);

export const productSelector = {
  getPriorityProductList: () => {
    return priorityProductsSelector;
  },
};
