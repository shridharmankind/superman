module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
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
    ],
  ],
};
