import {createSelector} from '@reduxjs/toolkit';

/**
 * selector function to retrieve data from redux store
 **/

const getTodoSelect = state => state.todoState.todos.selected;
const getPage = state => state.todoState.todos.page;
const perPageSelector = state => state.todoState.todos.perPage;
const todosSelector = state => state.todoState.todos.data;
const requestTracker = state => state.todoState.todos.requestTracker;

const pageStartIndexSelector = createSelector(
  [getPage, perPageSelector],
  (page, perPage) => page * perPage,
);

const pageEndIndexSelector = createSelector(
  [pageStartIndexSelector, perPageSelector],
  (pageStart, perPage) => pageStart + perPage,
);

export const getPagedTodos = createSelector(
  [pageStartIndexSelector, pageEndIndexSelector, todosSelector],
  (pageStart, pageEnd, todos) => todos.slice(pageStart, pageEnd),
);

export const getTodosTotal = createSelector(
  [todosSelector],
  todos => todos.length,
);

export const getTodoSelectedState = createSelector(
  [getTodoSelect],
  selected => selected,
);

export const todoSelector = {
  //request selector
  makeRequestTrackerSelector: () => {
    return createSelector([requestTracker], requestTracker => {
      return requestTracker;
    });
  },

  makeGetTodoSelectedState: () => {
    return getTodoSelectedState;
  },

  // start Index Selector
  makePageStartIndexSelector: () => {
    return pageStartIndexSelector;
  },

  // end Index Selector
  makePageEndIndexSelector: () => {
    return pageEndIndexSelector;
  },

  // get Todo Page
  makeGetPagedTodos: () => {
    return getPagedTodos;
  },

  //get Todos Total
  makeGetTodosTotal: () => {
    return getTodosTotal;
  },
};
