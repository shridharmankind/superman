import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 32,
    paddingVertical: 32,
    marginHorizontal: 68,
    marginVertical: 26.7,
    flex: 1,
    boxShadow: '0 0 40 #0000000D',
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
  leftPanel: {backgroundColor: 'yellow'},
  rightPanel: {backgroundColor: 'pink'},
  seperator: {
    borderRightWidth: 1.3,
    borderColor: theme.colors.blue[500],
  },
});

export default styles;
