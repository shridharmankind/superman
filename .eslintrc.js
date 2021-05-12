module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _elements: './src/components/elements',
          _widgets: './src/components/widgets',
          _navigations: './src/navigations',
          _generic: './src/screens/generic',
          _sales: './src/screens/sales',
          _tourPlan: './src/screens/tour-plan',
          _services: './src/services',
          _themes: './src/themes',
          _utils: './src/utils',
          _common: './src/common',
          _database: './src/database',
        },
      },
    },
  },
};
