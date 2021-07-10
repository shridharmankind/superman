import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 40,
    paddingVertical: 26,
    marginHorizontal: 50,
    marginTop: 40,
    marginBottom: 75,
    flex: 1,
    boxShadow: `0 0 40 #0000000D`,
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
});

export default styles;
