import {DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#ff7171',
    black: '#000',
    disabled: '#E4E4E4',
    grayishBlue: '#D5E2E7',
    lightGrayishBlue: '#F5F8F9',
    primary: '#322b7c',
    veryPaleRed: '#FFC0CB',
    white: '#fff',
    orange: '#FFA088',
    borderColor: '#979797',
    darkBlue: '#5920B7',
    lightBlue: '#0852C5',
    checkCircleBlue: '#0095d1',
    blackShades: {
      100: '#1C1939',
    },
    grey: {
      100: '#BEBEBF',
      200: '#1C1939',
      300: '#e3e3e3',
    },
  },
  fonts: {
    fontRegular: 'Poppins-Regular',
    fontBold: 'Poppins-Bold',
    fontLight: 'Poppins-Light',
    fontSemiBold: 'Poppins-SemiBold',
    fontItalic: 'Poppins-Italic',
  },
  roundness: 10,
};

export default theme;
