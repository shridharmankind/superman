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
};

/**
 *  redux-saga actions
 */
// export const getStandardPlanCreator = createAction('GET_STANDARDPLAN');
// export const getStandardPlanTypeName = getStandardPlanCreator().type;

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

/**
 *  create subordinate slice defining the intial state, reducers
 */
export const getStandardPlanSlice = createSlice({
  name: 'GET_STANDARDPLAN',
  initialState: standardTourPlan,
  reducers: {
    getParties: (state, action) => {
      return merge(state, action.payload);
    },
    getAreas: (state, action) => {
      return merge(state, action.payload);
    },
    getPatches: (state, action) => {
      return merge(state, action.payload);
    },
    getPartiesByPatchID: (state, action) => {
      return merge(state, action.payload);
    },
    savePatch: (state, action) => {
      return merge(state, action.payload);
    },
    resetPartiesByPatchID: state => {
      state.partyByPatchID = null;
    },
  },
});

export const standardPlanReducer = getStandardPlanSlice.reducer;
export const standardPlanActions = getStandardPlanSlice.actions;
