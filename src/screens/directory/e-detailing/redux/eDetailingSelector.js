import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const ePriorityProductSection = state => state?.ePriorityProductList;

const ePriorityProductSelector = createSelector(
  [ePriorityProductSection],
  section => section?.detailingPriorityProduct,
);
const ePriorityCountSelector = createSelector(
  [ePriorityProductSection],
  section => section?.totalCount,
);
const ePriorityDiscussedSelector = createSelector(
  [ePriorityProductSection],
  section => section?.discussedBrandList,
);
const priorityMotherBrandsSelector = createSelector(
  [ePriorityProductSection],
  section => section?.selectedMotherBrands,
);
const prioritySubBrandsSelector = createSelector(
  [ePriorityProductSection],
  section => section?.selectedSubbrands,
);
const prioritySKUsSelector = createSelector(
  [ePriorityProductSection],
  section => section?.selectedSKUs,
);

const eOtherProductSection = state => state?.eOtherProductList;

const eOtherCountSelector = createSelector(
  [eOtherProductSection],
  section => section?.totalCount,
);
const eOtherDiscussedSelector = createSelector(
  [eOtherProductSection],
  section => section?.discussedBrandList,
);

const eOtherProductSelector = createSelector(
  [eOtherProductSection],
  section => section?.detailingOtherProduct,
);

const otherMotherBrandsSelector = createSelector(
  [eOtherProductSection],
  section => section?.selectedMotherBrands,
);

const otherSubBrandsSelector = createSelector(
  [eOtherProductSection],
  section => section?.selectedSubbrands,
);

const otherSKUsSelector = createSelector(
  [eOtherProductSection],
  section => section?.selectedSKUs,
);

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
