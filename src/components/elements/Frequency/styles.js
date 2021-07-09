import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 1000,
    backgroundColor: themes.colors.black,
  },
});

export default styles;
