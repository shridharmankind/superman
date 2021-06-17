import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const visitList = state => state.timeline.data;
const buttonList = state => state.timeline.buttons;
const lastCompleted = state => state.timeline.lastCompleted;

const visitsSelector = createSelector([visitList], visit => visit);
const buttonsSelector = createSelector([buttonList], buttons => buttons);
const lastCompletedSelector = createSelector([lastCompleted], item => item);

export const timelineSelector = {
  getVisits: () => {
    return visitsSelector;
  },
  getButtons: () => {
    return buttonsSelector;
  },
  getLastCompleted: () => {
    return lastCompletedSelector;
  },
};
