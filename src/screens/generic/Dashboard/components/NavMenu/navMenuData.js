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
  LogoutIcon,
} from 'assets';
import * as DashboardRoutes from '../../routes';
import * as Constants from '../../constants';

// TODO move strings to en.json locale file after localization is setup
export default [
  {
    Icon: HomeIcon,
    label: 'Home',
    route: DashboardRoutes.ROUTE_HOME,
  },
  {
    Icon: CalendarIcon,
    label: 'Plan & Meet',
    route: DashboardRoutes.ROUTE_TOUR_PLAN,
  },
  {
    Icon: PerformanceIcon,
    label: 'Performance',
    route: DashboardRoutes.ROUTE_PERFORMANCE,
  },
  {
    Icon: DirectoryIcon,
    label: 'Directory',
    route: DashboardRoutes.ROUTE_DIRECTORY,
  },
  {
    Icon: GSPIcon,
    label: 'GSP',
    route: DashboardRoutes.ROUTE_GSP,
  },
  {
    Icon: ExpensesIcon,
    label: 'Admin',
    route: DashboardRoutes.ROUTE_ADMIN,
  },
  {
    Icon: ContentIcon,
    label: 'Content',
    route: DashboardRoutes.ROUTE_CONTENT,
  },
  {
    Icon: LearnIcon,
    label: 'Learn',
    route: DashboardRoutes.ROUTE_LEARN,
  },
  {
    Icon: SettingsIcon,
    label: 'Settings',
    route: DashboardRoutes.ROUTE_SETTINGS,
  },
  {
    Icon: SettingsIcon,
    label: 'Logout',
    Id: Constants.LOGOUT_ITEM_ID,
  },
];
