import {Login, Dashboard} from 'screens/generic';
import {Home, Performance} from 'screens';
import TourPlanning from 'screens/tour-plan';
import {HomeDetailsPage} from 'screens/home';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_DASHBOARD = 'Dashboard';

export const ROUTES_ROOT = [
  {
    name: ROUTE_LOGIN,
    component: Login,
  },
  {
    name: ROUTE_DASHBOARD,
    component: Dashboard,
  },
];

export const ROUTE_HOME = 'Home';
export const ROUTE_TOUR_PLAN = 'TourPlan';
export const ROUTE_PERFORMANCE = 'Performance';
export const ROUTE_DIRECTORY = 'Directory';
export const ROUTE_GSP = 'GSP';
export const ROUTE_ADMIN = 'Admin';
export const ROUTE_CONTENT = 'Content';
export const ROUTE_LEARN = 'Learn';
export const ROUTE_SETTINGS = 'Settings';

const ROUTES = [
  {
    name: ROUTE_HOME,
    component: Home,
    isLandingScreen: true,
  },
  {
    name: ROUTE_TOUR_PLAN,
    component: TourPlanning,
    isLandingScreen: true,
  },
  {
    name: ROUTE_PERFORMANCE,
    component: Performance,
    isLandingScreen: true,
  },
  {
    name: 'HomeDetails',
    component: HomeDetailsPage,
  },
];

export default ROUTES;
