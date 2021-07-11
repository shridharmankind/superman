import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing(32),
    paddingVertical: theme.spacing(32),
    marginHorizontal: theme.spacing(68),
    marginVertical: theme.spacing(26.7),
    flex: 1,
    boxShadow: `0 0 40 ${theme.colors.grey[2400]}`,
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
  panelWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: theme.spacing(40),
  },
  panel: {
    flex: 1,
  },
  seperator: {
    borderRightWidth: 1.3,
    borderColor: theme.colors.blue[500],
  },
});

export default styles;
