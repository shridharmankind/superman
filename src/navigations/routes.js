import {Login, Dashboard, MasterDataDownload} from 'screens/generic';
import {StandardPlan} from 'screens/tourPlan';
import LoginPageWeb from '../screens/generic/Login/index.web';

import ROUTES_HOME_ROOT from 'screens/home/routes';
import {isWeb} from 'helper';
import {DoctorFeedback} from 'screens/directory';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_MASTER_DATA_DOWNLOAD = 'MasterDataDownload';
export const ROUTE_DASHBOARD = 'Dashboard';
export const ROUTE_STANDARD_PLAN = 'StandardPlan';
export const ROUTE_DCR = 'DoctorFeedback';

const LoginComponent = isWeb() ? LoginPageWeb : Login;

const ROUTES = [
  {
    name: ROUTE_LOGIN,
    component: LoginComponent,
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
  {
    name: ROUTE_DCR,
    component: DoctorFeedback,
  },
  ...ROUTES_HOME_ROOT,
];

export default ROUTES;
