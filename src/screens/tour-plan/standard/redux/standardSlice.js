import {createAction, createSlice} from '@reduxjs/toolkit';
import merge from 'lodash.merge';

/**
 * Initial state
 */
export const standardTourPlan = {
  parties: [],
  areas: [],
  patches: [],
  partyByPatchID: null,
  stpData: [],
  updatedPartyArray: [],
};

// Action Creator and type for STP Update
export const fetchSTPCalendarUpdateCreator = createAction('STP_UPDATE_CREATOR');
export const fetchSTPCalendarUpdateCreatorType =
  fetchSTPCalendarUpdateCreator().type;

// Action Creator and type for Parties
export const fetchPartiesCreator = createAction('PARTIES_CREATOR');
export const fetchPartiesCreatorType = fetchPartiesCreator().type;

// Action Creator and type for Areas
export const fetchAreasCreator = createAction('AREAS_CREATOR');
export const fetchAreasCreatorType = fetchAreasCreator().type;

// Action Creator and type for Patches
export const fetchPatchesCreator = createAction('PATCHES_CREATOR');
export const fetchPatchesCreatorType = fetchPatchesCreator().type;

// Action Creator and type for Parties by patch ID
export const fetchPartiesByPatchIdCreator = createAction(
  'PARTIES_BY_PATCH_ID_CREATOR',
);
export const fetchPartiesByPatchIdCreatorType =
  fetchPartiesByPatchIdCreator().type;

// Action Creator and type for Parties by patch ID
export const savePatchCreator = createAction('SAVE_PATCH_CREATOR');
export const savePatchCreatorType = savePatchCreator().type;

const getUpdatedData = (data, partiesList) => {
  let newList = [];
  partiesList.map(item => {
    if (item.id === data.id) {
      newList.push({
        ...item,
        alreadyVisitedCount: data.alreadyVisitedCount,
      });
    } else {
      newList.push(item);
    }
  });
  return newList;
};
/**
 *  create subordinate slice defining the intial state, reducers
 */
export const getStandardPlanSlice = createSlice({
  name: 'GET_STANDARDPLAN',
  initialState: standardTourPlan,
  reducers: {
    getParties: (state, action) => {
      //return merge(state, action.payload);
      return {
        ...state,
        parties: action.payload.parties,
        updatedPartyArray: action.payload.parties,
      };
    },
    getAreas: (state, action) => {
      return merge(state, action.payload);
    },
    getPatches: (state, action) => {
      return merge(state, action.payload);
    },
    getPartiesByPatchID: (state, action) => {
      return {
        ...state,
        partyByPatchID: action.payload.partyByPatchID,
      };
    },
    savePatch: (state, action) => {
      return {
        ...state,
        savePatch: action.payload.savePatch,
      };
    },
    resetPartiesByPatchID: state => {
      return {
        ...state,
        partyByPatchID: null,
      };
    },
    resetSavePatch: state => {
      return {
        ...state,
        savePatch: null,
      };
    },
    resetState: state => {
      return {
        ...state,
        parties: [],
        updatedPartyArray: [],
        savePatch: null,
        patches: [],
        partyByPatchID: null,
      };
    },
    STPCalendarUpdate: (state, action) => {
      return {
        ...state,
        stpData: action.payload.stpData, //TO DO :: update on responsenfromm API
      };
    },
    updatePartyAreasOnSelection: (state, action) => {
      return {
        ...state,
        updatedPartyArray: getUpdatedData(
          action.payload,
          state.updatedPartyArray,
        ),
      };
    },
  },
});

export const standardPlanReducer = getStandardPlanSlice.reducer;
export const standardPlanActions = getStandardPlanSlice.actions;
