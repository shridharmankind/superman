import {Login, Dashboard, MasterDataDownload} from 'screens/generic';
import {StandardPlan} from 'screens/tourPlan';

import ROUTES_HOME_ROOT from 'screens/home/routes';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_MASTER_DATA_DOWNLOAD = 'MasterDataDownload';
export const ROUTE_DASHBOARD = 'Dashboard';
export const ROUTE_STANDARD_PLAN = 'StandardPlan';

const ROUTES = [
  {
    name: ROUTE_LOGIN,
    component: Login,
  },
  {
    name: ROUTE_MASTER_DATA_DOWNLOAD,
    component: MasterDataDownload,
  },
  {
    name: ROUTE_DASHBOARD,
    component: Dashboard,
  },
  {
    name: ROUTE_STANDARD_PLAN,
    component: StandardPlan,
  },
  ...ROUTES_HOME_ROOT,
];

export default ROUTES;
