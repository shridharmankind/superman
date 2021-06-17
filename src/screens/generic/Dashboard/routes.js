import {Home, TourPlanning, Performance, Directory} from 'screens';

export const ROUTE_HOME = 'Home';
export const ROUTE_TOUR_PLAN = 'TourPlan';
export const ROUTE_PERFORMANCE = 'Performance';
export const ROUTE_DIRECTORY = 'Directory';
export const ROUTE_GSP = 'GSP';
export const ROUTE_ADMIN = 'Admin';
export const ROUTE_CONTENT = 'Content';
export const ROUTE_LEARN = 'Learn';
export const ROUTE_SETTINGS = 'Settings';

const ROUTES_DASHBOARD = [
  {
    name: ROUTE_HOME,
    component: Home,
  },
  {
    name: ROUTE_TOUR_PLAN,
    component: TourPlanning,
    path: '/tour-plan',
  },
  {
    name: ROUTE_PERFORMANCE,
    component: Performance,
  },
  {
    name: ROUTE_DIRECTORY,
    component: Directory,
  },
  {
    name: ROUTE_GSP,
    component: Performance,
  },
  {
    name: ROUTE_ADMIN,
    component: Performance,
  },
  {
    name: ROUTE_CONTENT,
    component: Performance,
  },
  {
    name: ROUTE_LEARN,
    component: Performance,
  },
  {
    name: ROUTE_SETTINGS,
    component: Performance,
  },
];

export default ROUTES_DASHBOARD;
