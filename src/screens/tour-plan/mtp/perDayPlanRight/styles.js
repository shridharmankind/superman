import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing(26.7),
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTabBar: {
    width: 165,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  buttonTabBarText: {
    fontSize: 12.7,
  },
  header: {
    paddingBottom: theme.spacing(11.3),
  },
});

export default styles;
