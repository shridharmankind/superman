export const HTTP_OK = 200;
export const TOKEN_EXPIRY_TIME = 'TOKEN_EXPIRY_TIME';

export const TOAST_TYPES = {
  SUCCESS: 'success',
  NOTIFICATION: 'notification',
  WARNING: 'warning',
  ALERT: 'alert',
  STANDARD: 'standard',
  CONFIRM: 'confirm',
};

export const HTTP_PATCH_CODE = {
  VALIDATED: 400,
  ALREADY_EXITS: '103',
  PATCH_EXITS_FOR_OTHER_DAY: '107',
  PATCH_EXHAUSTED: '111',
};

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const DIVISION_COLOR = {
  KYC: 'kyc',
  A_PLUS: 'a+',
  B: 'b',
  A: 'a',
  C: 'c',
};

export const TOUR_PLAN = 'TourPlan';
export const ROUTE_EDETAILING = 'E-Detailing';

export const PARTY_TYPE = {
  DOCTOR: 'Doctor',
  CHEMIST: 'Chemist',
  ALL: 'All',
};

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
};

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
    'standardtourplan/staffPositionId/daily?week=weekVal&weekday=weekdayVal',
  COMPLAINCE_MONTHLY: 'standardtourplan/staffPositionId/month',
};
