import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const visitList = state => state.timeline.data;
const buttonList = state => state.timeline.buttons;
const visitsSelector = createSelector([visitList], visit => visit);
const buttonsSelector = createSelector([buttonList], buttons => buttons);

export const timelineSelector = {
  getVisits: () => {
    return visitsSelector;
  },
  getButtons: () => {
    return buttonsSelector;
  },
};
