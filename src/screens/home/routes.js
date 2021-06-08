import {HomeDetailsScreen, HomeLandingSecondaryScreen} from 'screens/home';
import HomeLanding from './landing';

export const ROUTE_HOME_LANDING = 'Landing';
export const ROUTE_HOME_LANDING_SECONDARY = 'LandingSecondary';

const PATH_ROOT = 'home/';

export const ROUTES_HOME = [
  {
    name: ROUTE_HOME_LANDING,
    component: HomeLanding,
    path: '',
  },
  {
    name: ROUTE_HOME_LANDING_SECONDARY,
    component: HomeLandingSecondaryScreen,
    path: 'secondary',
  },
];

export const ROUTE_HOME_DETAILS = 'Details';

export const ROUTES_HOME_ROOT = [
  {
    name: ROUTE_HOME_DETAILS,
    component: HomeDetailsScreen,
    path: `${PATH_ROOT}/details`,
  },
];

const HomeRoutes = [...ROUTES_HOME, ...ROUTES_HOME_ROOT];

export default HomeRoutes;
