import {DefaultTheme} from 'react-native-paper';

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
    fontRegular: 'Poppins-Regular',
    fontBold: 'Poppins-Bold',
    fontLight: 'Poppins-Light',
    fontSemiBold: 'Poppins-SemiBold',
    fontItalic: 'Poppins-Italic',
  },
};

export default theme;
