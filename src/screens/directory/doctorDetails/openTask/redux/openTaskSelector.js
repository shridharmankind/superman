import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const taskList = state => state.openTaskState.task.opentasks;
const totalTaskCount = state => state.openTaskState.task.count;

const tasksSelector = createSelector([taskList], task => task);
const totalTaskCountSelector = createSelector([totalTaskCount], count => count);

export const taskSelector = {
  getOpenTasks: () => {
    return tasksSelector;
  },
  getTaskCount: () => {
    return totalTaskCountSelector;
  },
};
