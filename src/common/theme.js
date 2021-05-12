import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#322b7c',
      accent: '#ff7171',
      veryPaleRed: '#FFC0CB',
      white: '#fff',
      black: '#000',
      lightGrayishBlue: '#F5F8F9',
      grayishBlue: '#D5E2E7'
    },
  };

  export default theme;