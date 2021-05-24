import {Login, Dashboard, LocalAuthorization} from 'screens/generic';

import ROUTES_HOME_ROOT from 'screens/home/routes';
export const ROUTE_LOGIN = 'Login';
export const ROUTE_DASHBOARD = 'Dashboard';

const ROUTES = [
  {
    name: 'Authorization',
    component: LocalAuthorization,
  },
  {
    name: ROUTE_LOGIN,
    component: Login,
  },
  {
    name: ROUTE_DASHBOARD,
    component: Dashboard,
  },
  ...ROUTES_HOME_ROOT,
];

export default ROUTES;
