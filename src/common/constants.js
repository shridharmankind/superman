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

export const revokeUrl =
  'https://mankindpharma-sandbox.onelogin.com/oidc/2/logout?post_logout_redirect_uri=com.superman://callback&id_token_hint=';

export const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};
