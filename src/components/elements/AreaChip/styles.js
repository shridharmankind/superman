import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  chipContainer: {
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    height: 42,
  },
  chip: {
    paddingHorizontal: themes.spacing(24), //24,
    paddingVertical: 7,
  },
});

export default styles;
