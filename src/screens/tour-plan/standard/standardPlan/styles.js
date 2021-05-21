import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: themes.colors.white,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -20,
  },
  activePaginationItem: {
    width: 72,
    backgroundColor: themes.colors.primary,
    opacity: 1,
  },
  paginationItem: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: themes.colors.primary,
    marginHorizontal: 12,
  },
});

export default styles;
