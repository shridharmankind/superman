const API_PATHS = {
  FETCH_QUALIFICATIONS: '/qualification',
  FETCH_SPECIALITIES: '/specialisation',
  MTP_CALENDAR: 'mtp/{staffpositionId}/calendar/{month}',
  GET_MISSED_CALLS:
    'dailyplanactivity/staffPositionId/month/missedCall/parties',
  ADD_TODAY_PLAN: 'dailyplanactivity/adhocplan',
  GET_SEARCH_DOCTORS: 'party/searchpartybyname',
  GET_TASKS: 'taskinfo/opentask',
  GET_PRODUCT: '/product/partyproduct',
  GET_TIMELINE: 'mtp/timeline/visit',
  GET_EDETAILING_PRODUCT: '/edetailing/motherbrands',
  TOUR_PLAN_STATUS: 'stp/tourplan/status',
};

export default API_PATHS;
