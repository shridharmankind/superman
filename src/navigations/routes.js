import {Login, Dashboard} from 'screens/generic';
import {Home, Performance} from 'src/screens';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_DASHBOARD = 'Dashboard';

export const ROUTE_COMPONENT_MAPPING = {
  [ROUTE_LOGIN]: Login,
  [ROUTE_DASHBOARD]: Dashboard,
};

export const ROUTE_HOME = 'Home';
export const ROUTE_TOUR_PLAN = 'TourPlan';
export const ROUTE_PERFORMANCE = 'Performance';
export const ROUTE_DIRECTORY = 'Directory';
export const ROUTE_GSP = 'GSP';
export const ROUTE_ADMIN = 'Admin';
export const ROUTE_CONTENT = 'Content';
export const ROUTE_LEARN = 'Learn';
export const ROUTE_SETTINGS = 'Settings';

export const ROUTE_COMPONENT_MAPPING_DASHBOARD = {
  [ROUTE_HOME]: Home,
  [ROUTE_TOUR_PLAN]: Performance,
  [ROUTE_PERFORMANCE]: Performance,
  [ROUTE_DIRECTORY]: Performance,
  [ROUTE_GSP]: Performance,
  [ROUTE_ADMIN]: Performance,
  [ROUTE_CONTENT]: Performance,
  [ROUTE_LEARN]: Performance,
  [ROUTE_SETTINGS]: Performance,
};
