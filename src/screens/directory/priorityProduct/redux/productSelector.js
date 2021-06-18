import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const productList = state => state.productList.priorityProduct;

const priorityProductsSelector = createSelector(
  [productList],
  product => product,
);

/**
 * get All the priority Products
 **/
export const productSelector = {
  getPriorityProductList: () => {
    return priorityProductsSelector;
  },
};
