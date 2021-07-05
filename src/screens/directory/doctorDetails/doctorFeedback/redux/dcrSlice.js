import {createAction, createSlice} from '@reduxjs/toolkit';

export const fetchDcrDetail = createAction('FETCH_DCR_DETAIL');
export const fetchDcrDetailType = fetchDcrDetail().type;

export const fetchDoctorList = createAction('FETCH_DOCTOR_LIST');
export const fetchDoctorListType = fetchDoctorList().type;

export const visitDetail = createAction('SET_VISIT_DETAIL');
export const visitDetailType = visitDetail().type;

const dcrState = {
  seniorList: [],
  visitLisit: [],
  doctorList: [],
  selectedList: [],
  doctors: [
    {
      eDetailProducts: [],
      discussedProduct: [],
      samplesGiven: [
        {
          taskId: '',
          name: '',
          skuId: '',
          image: '',
          stripReq: 27,
          stock: 200,
          completed: false,
        },
      ],
      itemsGiven: [
        {taskId: '', name: '', skuId: '', image: '', stripReq: 1, stock: 200},
      ],
      openTasks: [{taskTitle: '', taskDesc: '', dueDate: '', seniorId: ''}],
      samplesReq: [],
      itemsReq: [],
      updatedTask: [{}],
      notes: '',
    },
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
  },
});

export const dcrActions = dcrSlice.actions;

export const dcrReducer = dcrSlice.reducer;
