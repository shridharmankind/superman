import Routes from './routes';
import HomeRoutes from 'screens/home/routes';
import ROUTES_DASHBOARD from 'screens/generic/Dashboard/routes';

const prefixes = ['http://localhost:3000/', 'com.superman://'];

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
    },
  },
};

export default linking;
