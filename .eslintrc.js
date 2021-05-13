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
          components: './src/components',
          elements: './src/components/elements',
          widgets: './src/components/widgets',
          navigations: './src/navigations',
          generic: './src/screens/generic',
          sales: './src/screens/sales',
          tourPlan: './src/screens/tour-plan',
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
