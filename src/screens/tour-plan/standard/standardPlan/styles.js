import {StyleSheet, Dimensions} from 'react-native';
import themes from 'themes';

const {height} = Dimensions.get('window');

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
  swipe: {
    position: 'absolute',
    padding: 15,
    backgroundColor: themes.colors.white,
    height: height / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    top: '11%',
    bottom: 0,
    zIndex: 100,
  },
  leftSwipe: {
    left: 0,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  rightSwipe: {
    right: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

export default styles;
