import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const ePriorityProduct = state =>
  state.ePriorityProductList.detailingPriorityProduct;
const ePriorityCount = state => state.ePriorityProductList.totalCount;
const ePriorityDiscussedList = state =>
  state.ePriorityProductList.discussedBrandList;

const ePriorityProductSelector = createSelector(
  [ePriorityProduct],
  list => list,
);
const ePriorityCountSelector = createSelector([ePriorityCount], count => count);
const ePriorityDiscussedSelector = createSelector(
  [ePriorityDiscussedList],
  discussedList => discussedList,
);

const eOtherProduct = state => state.eOtherProductList.detailingOtherProduct;
const eOtherCount = state => state.eOtherProductList.totalCount;
const eOtherDiscussedList = state => state.eOtherProductList.discussedBrandList;

const eOtherCountSelector = createSelector([eOtherCount], count => count);
const eOtherDiscussedSelector = createSelector(
  [eOtherDiscussedList],
  discussedList => discussedList,
);

const eOtherProductSelector = createSelector([eOtherProduct], list => list);

export const eDetailingSelector = {
  getPriorityProduct: () => {
    return ePriorityProductSelector;
  },
  getPriorityCount: () => {
    return ePriorityCountSelector;
  },
  getPriorityDiscussedList: () => {
    return ePriorityDiscussedSelector;
  },
  getOtherProduct: () => {
    return eOtherProductSelector;
  },
  getOtherCount: () => {
    return eOtherCountSelector;
  },
  getOtherDiscussedList: () => {
    return eOtherDiscussedSelector;
  },
};
