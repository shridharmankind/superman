import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const ePriorityProduct = state =>
  state.ePriorityProductList.detailingPriorityProduct;
const ePriorityCount = state => state.ePriorityProductList.totalCount;
const ePriorityDiscussedList = state =>
  state.ePriorityProductList.discussedBrandList;
const priorityMotherBrands = state =>
  state.ePriorityProductList.selectedMotherBrands;
const prioritySubBrands = state => state.ePriorityProductList.selectedSubbrands;
const prioritySKUs = state => state.ePriorityProductList.selectedSKUs;

const ePriorityProductSelector = createSelector(
  [ePriorityProduct],
  list => list,
);
const ePriorityCountSelector = createSelector([ePriorityCount], count => count);
const ePriorityDiscussedSelector = createSelector(
  [ePriorityDiscussedList],
  discussedList => discussedList,
);

const priorityMotherBrandsSelector = createSelector(
  [priorityMotherBrands],
  brands => brands,
);

const prioritySubBrandsSelector = createSelector(
  [prioritySubBrands],
  brands => brands,
);

const prioritySKUsSelector = createSelector([prioritySKUs], brands => brands);

const eOtherProduct = state => state.eOtherProductList.detailingOtherProduct;
const eOtherCount = state => state.eOtherProductList.totalCount;
const eOtherDiscussedList = state => state.eOtherProductList.discussedBrandList;
const otherMotherBrands = state => state.eOtherProductList.selectedMotherBrands;
const otherSubBrands = state => state.eOtherProductList.selectedSubbrands;
const otherSKUs = state => state.eOtherProductList.selectedSKUs;

const eOtherCountSelector = createSelector([eOtherCount], count => count);
const eOtherDiscussedSelector = createSelector(
  [eOtherDiscussedList],
  discussedList => discussedList,
);

const eOtherProductSelector = createSelector([eOtherProduct], list => list);

const otherMotherBrandsSelector = createSelector(
  [otherMotherBrands],
  brands => brands,
);

const otherSubBrandsSelector = createSelector(
  [otherSubBrands],
  brands => brands,
);

const otherSKUsSelector = createSelector([otherSKUs], brands => brands);

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
  getPrioritySelectedMotherBrands: () => {
    return priorityMotherBrandsSelector;
  },
  getPrioritySelectedSubBrands: () => {
    return prioritySubBrandsSelector;
  },
  getPrioritySelectedSKUs: () => {
    return prioritySKUsSelector;
  },
  getOtherSelectedMotherBrands: () => {
    return otherMotherBrandsSelector;
  },
  getOtherSelectedSubBrands: () => {
    return otherSubBrandsSelector;
  },
  getOtherSelectedSKUs: () => {
    return otherSKUsSelector;
  },
};
