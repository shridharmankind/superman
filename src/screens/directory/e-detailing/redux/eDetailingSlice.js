import {createAction, createSlice} from '@reduxjs/toolkit';

/* Initial state of priority Product */
export const eDetailingPriorityProduct = {
  detailingPriorityProduct: [],
  totalCount: 0,
  isFeaturedEditable: false,
  discussedBrandList: [],
  selectedMotherBrands: {},
  selectedSubbrands: {},
  selectedSKUs: {},
};

/* Initial state of priority Product */
export const eDetailingOtherProduct = {
  detailingOtherProduct: [],
  otherTotalCount: 0,
  otherDiscussedBrandList: [],
  selectedMotherBrands: {},
  selectedSubbrands: {},
  selectedSKUs: {},
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
      return {
        ...state,
        ...action.payload,
        ...parseSelectedProducts(
          action.payload.detailingPriorityProduct,
          action.payload.discussedBrandList,
          true,
        ),
      };
    },
    setSelectedSubbrands: (state, action) => setSelectedBrands(state, action),
  },
});

export const ePriorityProductActions = ePriorityProductSlice.actions;
export const ePriorityProductReducer = ePriorityProductSlice.reducer;

const eOtherProductSlice = createSlice({
  name: 'EDETAILING_OTHER_PRODUCT',
  initialState: eDetailingOtherProduct,
  reducers: {
    getDetailingOtherProduct: (state, action) => {
      return {
        ...state,
        ...action.payload,
        ...parseSelectedProducts(
          action.payload.detailingOtherProduct,
          action.payload.discussedBrandList,
          false,
        ),
      };
    },
    setSelectedSubbrands: (state, action) => setSelectedBrands(state, action),
  },
});

const parseSelectedProducts = (data, discussedList, isPriority) => {
  const selectedMotherBrands = {};
  const selectedSubbrands = {};
  const selectedSKUs = {};
  if (discussedList?.length > 0) {
    for (const discussed of discussedList) {
      if (discussed.skuId > 0) {
        selectedSKUs[discussed.skuId] = true;
      } else if (discussed.subBrandId > 0) {
        selectedSubbrands[discussed.subBrandId] = true;
      } else {
        selectedMotherBrands[discussed.motherBrandId] = true;
      }
    }
  } else if (isPriority) {
    for (const motherBrand of data) {
      if (motherBrand.isFeatured) {
        selectedMotherBrands[motherBrand.motherBrandId] = true;
        for (const subBrand of motherBrand?.subList) {
          if (subBrand.skuId > 0) {
            selectedSKUs[subBrand.skuId] = true;
          } else {
            selectedSubbrands[subBrand.subBrandId] = true;
          }
        }
      }
    }
  }
  console.log({selectedMotherBrands, selectedSubbrands, selectedSKUs});
  return {selectedMotherBrands, selectedSubbrands, selectedSKUs};
};

const setSelectedBrands = (state, action) => {
  const selectedMotherBrands = {
    ...state.selectedMotherBrands,
    ...action.payload.selectedMotherBrands,
  };
  const selectedSubbrands = {
    ...state.selectedSubbrands,
    ...action.payload.selectedSubbrands,
  };
  const selectedSKUs = {
    ...state.selectedSKUs,
    ...action.payload.selectedSKUs,
  };
  return {
    ...state,
    ...{selectedMotherBrands, selectedSubbrands, selectedSKUs},
  };
};

export const eOtherProductActions = eOtherProductSlice.actions;
export const eOtherProductReducer = eOtherProductSlice.reducer;
