import EDetailing from './e-detailing/e-detailing.component';
import DirectoryLanding from './landing';

export const ROUTE_DIRECTORY_LANDING = 'DirectoryLanding';
export const ROUTE_EDETAILING = 'E-Detailing';

export const ROUTES_DIRECTORY = [
  {
    name: ROUTE_DIRECTORY_LANDING,
    component: DirectoryLanding,
  },
  {
    name: ROUTE_EDETAILING,
    component: EDetailing,
  },
];
