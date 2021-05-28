import {DefaultTheme} from 'react-native-paper';

import Colors from './colors';
import Typography, {fontFamilies} from './typography';

const theme = {
  ...DefaultTheme,
  spacing: space => {
    /**
     * manage size ratio using the spacing factor
     * ex 8/1.5 scales down everything by 1.5 times
     */
    const scalingFactor = 1;
    return space / scalingFactor;
  },
  sizing: size => {
    const sizingFactor = 1;
    return size / sizingFactor;
  },
  typography: {
    ...Typography,
  },
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
  fonts: {
    ...fontFamilies,
  },
  roundness: 10,
};

export default theme;
