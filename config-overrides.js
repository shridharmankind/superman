const path = require('path');
const {
  override,
  addBabelPlugins,
  addBabelPlugin,
  babelInclude,
  removeModuleScopePlugin,
} = require('customize-cra');

module.exports = override(
  removeModuleScopePlugin(),
  ...addBabelPlugins(
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs',
  ),
  addBabelPlugin([
    'module-resolver',
    {
      alias: {
        assets: './src/assets',
        'components/elements': './src/components/elements',
        'components/widgets': './src/components/widgets',
        'components/layouts': './src/components/layouts',
        'screens/generic': './src/screens/generic',
        'screens/sales': './src/screens/sales',
        'screens/tourPlan': './src/screens/tour-plan',
        'screens/home': './src/screens/home',
        screens: './src/screens',
        navigations: './src/navigations',
        services: './src/services',
        themes: './src/themes',
        utils: './src/utils',
        common: './src/common',
        database: './src/database',
        helper: './src/helper',
        reducers: './src/store/reducers',
        sagas: './src/store/sagas',
        selectors: './src/store/selectors',
        states: './src/store/states',
      },
    },
  ]),
  babelInclude([
    path.resolve(__dirname, 'node_modules/react-native-elements'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/react-native-ratings'),
    path.resolve(__dirname, 'node_modules/react-native-reanimated'),
    path.resolve(__dirname, 'node_modules/react-native-calendars'),
    path.resolve(__dirname, 'node_modules/react-native-swipe-gestures'),
    path.resolve(__dirname, 'src'),
  ]),
);
