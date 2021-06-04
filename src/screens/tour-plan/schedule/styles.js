import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTabBar: {
    width: theme.spacing(165),
    marginHorizontal: theme.spacing(8),
    height: theme.spacing(42),
  },
  buttonTabBarText: {
    fontSize: 12,
  },
});

export default styles;
