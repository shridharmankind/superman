module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          assets: './src/assets',
          'components/elements': './src/components/elements',
          'components/widgets': './src/components/widgets',
          'screens/generic': './src/screens/generic',
          'screens/sales': './src/screens/sales',
          'screens/tourPlan': './src/screens/tour-plan',
          navigations: './src/navigations',
          services: './src/services',
          themes: './src/themes',
          utils: './src/utils',
          common: './src/common',
          database: './src/database',
        },
      },
    },
  },
};
