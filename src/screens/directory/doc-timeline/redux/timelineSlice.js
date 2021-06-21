import {createAction, createSlice} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {getFormatDate, startOf, isAfter} from 'utils/dateTimeHelper';

/* Initial state of timline */
export const timelineState = {
  data: [],
  buttons: [],
  lastCompleted: null,
};

/* Action Creator */
export const fetchTimelineCreator = createAction('FETCH_TIMELINE_VISITS');
export const fetchTimelineTypeName = fetchTimelineCreator().type;

// Timeline slice
const timelineSlice = createSlice({
  name: 'TIMELINE',
  initialState: timelineState,
  reducers: {
    getTimeline: (state, action) => {
      return {...state, ...parseData(action.payload)};
    },
    setSelectedButtonIndex: (state, action) => {
      const index = action.payload.index;
      const buttons = [];
      for (let idx = 0; idx < state.buttons.length; idx += 1) {
        const button = state.buttons[idx];
        buttons.push({...button, selected: idx === index});
      }
      return {...state, buttons};
    },
    handleScroll: (state, action) => {
      const itemIndex = action.payload.index;
      const buttons = [];
      let isButtonSet = false;
      for (let idx = 0; idx < state.buttons.length; idx += 1) {
        const button = state.buttons[idx];
        if (!isButtonSet && button.itemIndex <= itemIndex) {
          isButtonSet = true;
          buttons.push({...button, selected: true});
        } else {
          buttons.push({...button, selected: false});
        }
      }
      return {...state, buttons};
    },
  },
});

/**
 * Parse data for upcoming visits
 *
 * @param {Object} data
 * @return {Object} parsed data
 */
const parseData = data => {
  if (!data || !data.length) {
    return [];
  }
  let index = 0;
  const upcomingVisits = [];
  while (dayjs(data[index].date).isAfter(new Date())) {
    index += 1;
  }
  let counter = 1;
  const stripTill = index;
  index = index - 1;
  while (index > -1 && counter < 3) {
    upcomingVisits.unshift(data[index]);
    counter += 1;
    index -= 1;
  }
  data.splice(0, stripTill);
  return prepareState([...upcomingVisits, ...data]);
};

/**
 * Prepare buttons and data
 *
 * @param {Array} data
 * @return {Object} new state
 */
const prepareState = data => {
  let buttons = [];
  let lastMonth = null;
  let index = 0;
  let lastCompleted = null;
  for (const iterator of data) {
    if (lastMonth !== dayjs(iterator.date).month()) {
      lastMonth = dayjs(iterator.date).month();
      const label = getFormatDate({
        date: iterator.date,
        format: 'MMMM',
      });
      if (buttons.length < 3) {
        buttons.unshift({
          itemIndex: index,
          label,
          selected: buttons.length === 0,
        });
      }
    }
    if (lastCompleted === null && isCompleted(iterator)) {
      lastCompleted = {index, item: iterator};
    }
    if (buttons.length === 3 && lastCompleted) {
      break;
    }
    index += 1;
  }
  return {buttons, data, lastCompleted};
};

/**
 * Check if item is completed
 *
 * @param {Object} item
 * @return {Boolean} Is Completed
 */
const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date) && !item.isMissed;
};

export const timelineActions = timelineSlice.actions;
export const timelineReducer = timelineSlice.reducer;
