import {StyleSheet, Dimensions} from 'react-native';
import {isWeb} from 'helper';
import theme from 'themes';

const {height, width} = Dimensions.get('screen');

const viewHeight = isWeb() ? window.innerHeight : height;
const viewWidth = isWeb() ? window.innerWidth : width;

export default StyleSheet.create({
  container: {
    height: viewHeight,
    width: viewWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    marginTop: theme.spacing(24),
  },
  logo: {
    height: 32,
    width: 133,
    alignSelf: 'center',
  },
});
