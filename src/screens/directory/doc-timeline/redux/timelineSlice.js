import {createAction, createSlice} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

/* Initial state of timline */
export const timelineState = {
  data: [],
  isPending: false,
};

/* Action Creator */
export const fetchTimelineCreator = createAction('FETCH_TIMELINE_VISITS');
export const fetchTimelineTypeName = fetchTimelineCreator().type;

const timelineSlice = createSlice({
  name: 'TIMELINE',
  initialState: timelineState,
  reducers: {
    getTimeline: (state, action) => {
      return {...state, data: parseData(action.payload)};
    },
  },
});

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
    upcomingVisits.push(data[index]);
    counter += 1;
    index -= 1;
  }
  data.splice(0, stripTill);
  return [...upcomingVisits, ...data];
};

export const timelineActions = timelineSlice.actions;
export const timelineReducer = timelineSlice.reducer;
