export const API_PATH = {
  GET_PARTIES:
    'mtp/staffpositionid/parties?Month=monthVal&Year=yearVal&Day=dayVal',
  GET_SUBORDINATES: 'staff/getsubordinates',
  WORKING_DAY: 'stp/workingday',
  REMOVE_PARTY_FROM_DAILY_PLAN: 'mtp/staffpositionid/party/partyid',
  PATCH: '/patch',
  AREA_BY_SPID: '/party/areabyspid',
  PARTY_BY_SPID: '/party/partybyspid',
  STP_CALENDAR_UPDATE: 'stp/calendar/staffPositionId/updates',
  COMPLAINCE_DAILY:
    'compliance/standardtourplan/staffPositionId/daily?week=weekVal&weekday=weekdayVal',
  COMPLAINCE_MONTHLY: 'compliance/standardtourplan/staffPositionId/month',
  STP_STATUS: 'stp/status/staffPositionId/year',
  SUBMIT_STP: 'stp/status/staffPositionId',
  SWAP: 'mtp/staffPositionId/patch/swap',
};
