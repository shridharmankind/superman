import Routes from './routes';
import HomeRoutes, {ROUTES_HOME} from 'screens/home/routes';
import ROUTES_DASHBOARD from 'screens/generic/Dashboard/routes';

const origin = (window && window.location && window.location.origin) || '';
const prefixes = [origin, 'com.superman://'];

const getScreensConfigFromRoutes = routes => {
  const screens = {};

  routes.forEach(route => {
    const path = route.path || route.name.toLowerCase();
    screens[Object.values(route)[0]] = path;
  });

  return screens;
};

const linking = {
  prefixes,
  config: {
    screens: {
      ...getScreensConfigFromRoutes(Routes),
      ...getScreensConfigFromRoutes(ROUTES_DASHBOARD),
      ...getScreensConfigFromRoutes(HomeRoutes),
      ...getScreensConfigFromRoutes(ROUTES_HOME),
    },
  },
};

export default linking;
