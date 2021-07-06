import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  chipContainer: {
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    height: 50,
  },
  chip: {
    paddingHorizontal: themes.spacing(24),
    paddingVertical: themes.spacing(7),
  },
});

export default styles;
