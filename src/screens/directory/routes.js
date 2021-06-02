import DirectoryLanding from './landing';
import DoctorProfile from './doctorDetails';

export const ROUTE_DIRECTORY_LANDING = 'DirectoryLanding';
export const ROUTE_DIRECTORY_PROFILE = 'DirectoryDoctorProfile';

export const ROUTES_DIRECTORY = [
  {
    name: ROUTE_DIRECTORY_LANDING,
    component: DirectoryLanding,
  },
  {
    name: ROUTE_DIRECTORY_PROFILE,
    component: DoctorProfile,
  },
];
