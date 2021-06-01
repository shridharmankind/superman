import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

/** Selector function to retrieve all parties */
const getPartiesList = state => state.standardPlan.parties;
const getPartiesSelector = createSelector([getPartiesList], data => data);

/** Selector function to retrieve all areas */
const getAreasList = state => state.standardPlan.areas;
const getAreasSelector = createSelector([getAreasList], data => data);

/** Selector function to retrieve all patches */
const getPatchesList = state => state.standardPlan.patches;
const getPatchesListSelector = createSelector([getPatchesList], data => data);

/** Selector function to retrieve all parties by patch selected */
const getPartyByPatchID = state => state.standardPlan.partyByPatchID;
const getPartiesByPatchIDSelector = createSelector(
  [getPartyByPatchID],
  data => data,
);

export const standardTourPlanSelector = {
  getParties: () => {
    return getPartiesSelector;
  },
  getAreas: () => {
    return getAreasSelector;
  },
  getPatches: () => {
    return getPatchesListSelector;
  },
  getPartiesByPatchID: () => {
    return getPartiesByPatchIDSelector;
  },
};
