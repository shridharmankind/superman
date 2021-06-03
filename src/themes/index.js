import {DefaultTheme} from 'react-native-paper';

import Colors from './colors';
import Typography, {fontFamilies} from './typography';

const theme = {
  ...DefaultTheme,
  spacing: space => {
    /**
     * manage size ratio using the spacing factor
     * scalingFactor helps scale UI elements up/down
     */
    const scalingFactor = 1;
    return space / scalingFactor;
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
