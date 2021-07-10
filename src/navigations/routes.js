import {Dashboard} from 'screens/generic';
import {StandardPlan, MtpPerDayPlan} from 'screens/tourPlan';

import ROUTES_HOME_ROOT from 'screens/home/routes';

import {DoctorFeedback, Presentation} from 'screens/directory';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_AUTH = 'Auth';
export const ROUTE_MASTER_DATA_DOWNLOAD = 'MasterDataDownload';
export const ROUTE_DASHBOARD = 'Dashboard';
export const ROUTE_STANDARD_PLAN = 'StandardPlan';
export const ROUTE_MTP_PER_DAY_PLAN = 'MtpPerDayPlan';
export const ROUTE_DCR = 'DoctorFeedback';
export const ROUTE_PRESENTATION = 'Presentation';
export const ROUTE_SETTING = 'Setting';

const ROUTES = [
  {
    name: ROUTE_DASHBOARD,
    component: Dashboard,
  },
  {
    name: ROUTE_STANDARD_PLAN,
    component: StandardPlan,
  },
  {
    name: ROUTE_MTP_PER_DAY_PLAN,
    component: MtpPerDayPlan,
  },
  {
    name: ROUTE_DCR,
    component: DoctorFeedback,
  },
  {
    name: ROUTE_PRESENTATION,
    component: Presentation,
  },
  ...ROUTES_HOME_ROOT,
];

export default ROUTES;
