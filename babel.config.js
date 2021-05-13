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
    ],
  ],
};
