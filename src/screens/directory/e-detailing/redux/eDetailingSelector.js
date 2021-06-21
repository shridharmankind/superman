import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const ePriorityProduct = state =>
  state.ePriorityProductList.detailingPriorityProduct;

const ePriorityProductSelector = createSelector(
  [ePriorityProduct],
  list => list,
);

const eOtherProduct = state => state.eOtherProductList.detailingOtherProduct;

const eOtherProductSelector = createSelector([eOtherProduct], list => list);

export const eDetailingSelector = {
  getPriorityProduct: () => {
    return ePriorityProductSelector;
  },
  getOtherProduct: () => {
    return eOtherProductSelector;
  },
};
