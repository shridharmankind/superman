export const HTTP_OK = 200;
export const TOKEN_EXPIRY_TIME = 'TOKEN_EXPIRY_TIME';

export const BACKGROUND_TASK = {
  TASK_NAME: 'BACKGROUND_TASK', //Task Name for running background task
  ON_DEMAND_TASK_NAME: 'ON_DEMAND_TASK',
  NOT_RUNNING: 'NOT_RUNNING',
  RUNNING: 'RUNNING',
  SYNC_FLEX_TIME: 50, //seconds    //The amount of flex time in seconds before syncInterval that you permit for the sync to take place. Must be less than syncInterval
  SYNC_INTERVAL: 120, //seconds   //The amount of time in seconds that you wish to elapse between periodic syncs
};

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
  D: 'd',
  CAMPAIGN: 'campaign',
};

export const TOUR_PLAN = 'TourPlan';
export const ROUTE_EDETAILING = 'E-Detailing';

export const PARTY_TYPE = {
  DOCTOR: 'Doctor',
  CHEMIST: 'Chemist',
  ALL: 'All',
};

export const GENDER = {
  MALE: 'M',
  FEMALE: 'F',
};

export const revokeUrl =
  'https://mankindpharma-sandbox.onelogin.com/oidc/2/logout?post_logout_redirect_uri=com.superman://callback&id_token_hint=';
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
