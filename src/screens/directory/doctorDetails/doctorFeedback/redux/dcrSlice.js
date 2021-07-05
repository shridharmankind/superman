import {createAction, createSlice} from '@reduxjs/toolkit';

export const fetchStaffDetail = createAction('FETCH_STAFF_DETAIL');
export const fetchStaffDetailType = fetchStaffDetail().type;

export const fetchDcrData = createAction('FETCH_DCR_DETAIL');
export const fetchDcrDataType = fetchDcrData().type;

export const fetchDoctorList = createAction('FETCH_DOCTOR_LIST');
export const fetchDoctorListType = fetchDoctorList().type;

export const fetchEDetailedList = createAction('FETCH_EDETAILED_LIST');
export const fetchEDetailedListType = fetchEDetailedList().type;

export const fetchOtherProducts = createAction('FETCH_OTHER_LIST');
export const fetchOtherProductsType = fetchOtherProducts().type;

export const visitDetail = createAction('SET_VISIT_DETAIL');
export const visitDetailType = visitDetail().type;

export const searchSamples = createAction('SEARCH_SAMPLES');
export const searchSamplesType = searchSamples().type;

export const searchItems = createAction('SEARCH_ITEMS');
export const searchItemsType = searchItems().type;

export const selectSamples = createAction('SELECT_SAMPLES');
export const selectSamplesType = selectSamples().type;

const dcrState = {
  seniorList: [],
  visitLisit: [],
  samples: [],
  selectedSamples: [],
  items: [],
  selectedItems: [],
  doctorList: [],
  selectedList: [],
  eDetailProducts: [],
  otherProducts: [],
  discussedProduct: [],
  doctors: [
    // {
    //   eDetailProducts: [],
    //   discussedProduct: [],
    //   samplesGiven: [
    //     {
    //       taskId: '',
    //       name: '',
    //       skuId: '',
    //       image: '',
    //       stripReq: 27,
    //       stock: 200,
    //       completed: false,
    //     },
    //   ],
    //   itemsGiven: [
    //     {taskId: '', name: '', skuId: '', image: '', stripReq: 1, stock: 200},
    //   ],
    //   openTasks: [{taskTitle: '', taskDesc: '', dueDate: '', seniorId: ''}],
    //   samplesReq: [],
    //   itemsReq: [],
    //   updatedTask: [{}],
    //   notes: '',
    // },
  ],
  nudges: [{title: '', desc: '', image: '', like: 1}, {}],
};

const dcrSlice = createSlice({
  name: 'DCR_DATA',
  initialState: dcrState,
  reducers: {
    getSeniors: (state, action) => {
      return {...state, ...action.payload};
    },
    setVisitors: (state, action) => {
      return {...state, ...action.payload};
    },
    getDoctorDetails: (state, action) => {
      return {...state, ...action.payload};
    },
    updateDoctorDetails: (state, action) => {
      return {...state, doctors: [...action.payload]};
    },
    getSamples: (state, action) => {
      return {...state, ...action.payload};
    },
    selectSamples: (state, action) => {
      return {...state, ...action.payload};
    },
    clearSelectedSamples: state => {
      return {...state, selectedSamples: []};
    },
    getItems: (state, action) => {
      return {...state, ...action.payload};
    },
    selectItems: (state, action) => {
      return {...state, selectedItems: [...action.payload]};
    },
    clearSelectedItems: state => {
      return {...state, selectedItems: []};
    },
    getDoctors: (state, action) => {
      return {...state, ...action.payload};
    },
    setDoctorList: (state, action) => {
      const {doctorData, selectedDocData} = action.payload;
      const doctorActionData = {
        doctorList: doctorData,
      };
      const selectedActionData = {
        selectedList: selectedDocData,
      };
      return {...state, ...doctorActionData, ...selectedActionData};
    },
    getEdetailedList: (state, action) => {
      return {...state, ...action.payload};
    },
    getOtherProductList: (state, action) => {
      return {...state, ...action.payload};
    },
    setDiscussedProduct: (state, action) => {
      const {otherProducts, discussList} = action.payload;
      // const otherProductDataList = {
      //   otherProducts: otherProducts,
      // };
      const discussedList = {
        discussedProduct: discussList,
      };
      return {...state, ...discussedList};
    },
  },
});

export const dcrActions = dcrSlice.actions;

export const dcrReducer = dcrSlice.reducer;
