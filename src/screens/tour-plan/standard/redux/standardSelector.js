import {createSelector} from '@reduxjs/toolkit';
import {sortByCategory} from 'screens/tourPlan/helper';

/**
 * selector function to retrieve data from redux store
 **/

/** Selector function to retrieve all parties */
const getPartiesList = state => state.standardPlan.parties;
const getPartiesSelector = createSelector([getPartiesList], data =>
  sortByCategory(data),
);

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

/** Selector function to save/update patch */
const savePatch = state => state.standardPlan.savePatch;
const savePatchSelector = createSelector([savePatch], data => data);

/** Selector function to  get stp update */
const stpUpdate = state => state.standardPlan.stpData;
const stpUpdateSelector = createSelector([stpUpdate], data => data);

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
  savePatch: () => {
    return savePatchSelector;
  },
  getSTPData: () => stpUpdateSelector,
};
