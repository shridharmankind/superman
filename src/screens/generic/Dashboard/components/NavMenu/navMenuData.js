import {
  HomeIcon,
  CalendarIcon,
  PerformanceIcon,
  DirectoryIcon,
  GSPIcon,
  ExpensesIcon,
  ContentIcon,
  LearnIcon,
  SettingsIcon,
} from 'assets';
import * as Routes from 'navigations/routes';

// TODO move strings to en.json locale file after localization is setup
export default [
  {
    Icon: HomeIcon,
    label: 'Home',
    route: Routes.ROUTE_HOME,
  },
  {
    Icon: CalendarIcon,
    label: 'Plan & Meet',
    route: Routes.ROUTE_TOUR_PLAN,
  },
  {
    Icon: PerformanceIcon,
    label: 'Performance',
    route: Routes.ROUTE_PERFORMANCE,
  },
  {
    Icon: DirectoryIcon,
    label: 'Directory',
    route: Routes.ROUTE_DIRECTORY,
  },
  {
    Icon: GSPIcon,
    label: 'GSP',
    route: Routes.ROUTE_GSP,
  },
  {
    Icon: ExpensesIcon,
    label: 'Admin',
    route: Routes.ROUTE_ADMIN,
  },
  {
    Icon: ContentIcon,
    label: 'Content',
    route: Routes.ROUTE_CONTENT,
  },
  {
    Icon: LearnIcon,
    label: 'Learn',
    route: Routes.ROUTE_LEARN,
  },
  {
    Icon: SettingsIcon,
    label: 'Settings',
    route: Routes.ROUTE_SETTINGS,
  },
  {
    Icon: SettingsIcon,
    label: 'Logout',
  },
];
