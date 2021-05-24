import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftTabContainer: {
    width: '52%',
  },
  rightTabContainer: {
    justifyContent: 'flex-end',
  },
  buttonTabBar: {
    width: 165,
    marginHorizontal: 8,
    height: 42,
  },
  buttonTabBarText: {
    fontSize: 12,
  },
});

export default styles;
