import {Login, Dashboard} from 'screens/generic';
import {StandardPlan} from 'screens/tourPlan';

import ROUTES_HOME_ROOT from 'screens/home/routes';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_DASHBOARD = 'Dashboard';
export const ROUTE_STANDARD_PLAN = 'StandardPlan';

const ROUTES = [
  {
    name: ROUTE_LOGIN,
    component: Login,
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
