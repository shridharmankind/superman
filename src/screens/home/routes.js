import {HomeDetailsScreen, HomeLandingSecondaryScreen} from 'screens/home';
import HomeLanding from './landing';

export const ROUTE_HOME_LANDING = 'HomeLanding';
export const ROUTE_HOME_LANDING_SECONDARY = 'HomeLandingSecondary';

export const ROUTES_HOME = [
  {
    name: ROUTE_HOME_LANDING,
    component: HomeLanding,
    path: '/landing',
  },
  {
    name: ROUTE_HOME_LANDING_SECONDARY,
    component: HomeLandingSecondaryScreen,
    path: '/landing-secondary',
  },
];

export const ROUTE_HOME_DETAILS = 'HomeDetails';

const ROUTES_HOME_ROOT = [
  {
    name: ROUTE_HOME_DETAILS,
    component: HomeDetailsScreen,
    path: '/details',
  },
];

export default ROUTES_HOME_ROOT;
