import { DefaultTheme } from 'react-native-paper';

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
    grayishBlue: '#D5E2E7',
  },
  fonts: {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    light: "Poppins-Light",
    semiBold: "Poppins-SemiBold",
    italic: "Poppins-Italic"

  }
};

export default theme;
